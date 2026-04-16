import { MeasurementUnit } from "../generated/prisma";
import { isDistanceUnit, isTimeUnit } from "./unitConversion";

export type WorkoutRepResult = {
  label?: string;
  plannedValue?: number | null;
  actualValue?: number | null;
  unit?: MeasurementUnit | null;
};

export type WorkoutResultsInput = {
  reps?: Array<
    WorkoutRepResult & {
      distance?: number;
      actualSeconds?: number;
    }
  >;
} | null;

export type WorkoutRepAnalysis = {
  label: string;
  plannedValue?: number;
  actualValue?: number;
  unit?: MeasurementUnit;
  delta?: number;
  deltaPercent?: number;
  classification: "excellent" | "on-plan" | "under-goal" | "unplanned";
};

export function normalizeWorkoutResults(results: unknown): WorkoutRepResult[] {
  if (!results || typeof results !== "object" || !("reps" in results)) {
    return [];
  }

  const normalizedResults = results as NonNullable<WorkoutResultsInput>;
  const reps = normalizedResults.reps;
  if (!Array.isArray(reps)) {
    return [];
  }

  return reps.map((rep, index) => {
    const unit =
      rep.unit && Object.values(MeasurementUnit).includes(rep.unit)
        ? rep.unit
        : rep.actualSeconds != null
          ? MeasurementUnit.SECONDS
          : undefined;

    return {
      label: rep.label ?? (rep.distance ? `${rep.distance}m` : `Rep ${index + 1}`),
      plannedValue: rep.plannedValue ?? null,
      actualValue:
        rep.actualValue ?? (rep.actualSeconds != null ? rep.actualSeconds : null),
      unit: unit ?? null,
    };
  });
}

export function analyzeWorkoutResults(results: unknown): WorkoutRepAnalysis[] {
  return normalizeWorkoutResults(results).map((rep, index) => {
    const label = rep.label?.trim() || `Rep ${index + 1}`;
    const unit = rep.unit ?? undefined;

    if (
      rep.plannedValue == null ||
      rep.actualValue == null ||
      unit == null
    ) {
      return {
        label,
        plannedValue: rep.plannedValue ?? undefined,
        actualValue: rep.actualValue ?? undefined,
        unit,
        classification: "unplanned",
      };
    }

    const delta = rep.actualValue - rep.plannedValue;
    const deltaPercent =
      rep.plannedValue === 0 ? 0 : (delta / rep.plannedValue) * 100;

    let classification: WorkoutRepAnalysis["classification"] = "on-plan";
    if (isTimeUnit(unit)) {
      if (deltaPercent <= -3) {
        classification = "excellent";
      } else if (deltaPercent > 2) {
        classification = "under-goal";
      }
    } else if (isDistanceUnit(unit)) {
      if (deltaPercent >= 3) {
        classification = "excellent";
      } else if (deltaPercent < -2) {
        classification = "under-goal";
      }
    }

    return {
      label,
      plannedValue: rep.plannedValue,
      actualValue: rep.actualValue,
      unit,
      delta,
      deltaPercent,
      classification,
    };
  });
}

export function summarizeWorkoutPerformance(results: unknown) {
  const analysis = analyzeWorkoutResults(results);
  const plannedReps = analysis.filter((rep) => rep.classification !== "unplanned");

  if (plannedReps.length === 0) {
    return "No planned-vs-actual data yet.";
  }

  const excellent = plannedReps.filter((rep) => rep.classification === "excellent").length;
  const underGoal = plannedReps.filter((rep) => rep.classification === "under-goal").length;

  if (excellent === plannedReps.length) {
    return "All reps outperformed the plan.";
  }

  if (underGoal === plannedReps.length) {
    return "All reps came in under the planned target.";
  }

  if (excellent > underGoal) {
    return `${excellent} rep${excellent === 1 ? "" : "s"} beat the plan.`;
  }

  if (underGoal > 0) {
    return `${underGoal} rep${underGoal === 1 ? "" : "s"} missed the plan.`;
  }

  return "Most reps landed on plan.";
}
