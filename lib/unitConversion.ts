import { MeasurementUnit } from "../generated/prisma";

const DISTANCE_IN_METERS: Partial<Record<MeasurementUnit, number>> = {
  [MeasurementUnit.METERS]: 1,
  [MeasurementUnit.KILOMETERS]: 1000,
  [MeasurementUnit.YARDS]: 0.9144,
};

const TIME_IN_SECONDS: Partial<Record<MeasurementUnit, number>> = {
  [MeasurementUnit.SECONDS]: 1,
  [MeasurementUnit.MINUTES]: 60,
  [MeasurementUnit.HOURS]: 3600,
};

export function isDistanceUnit(unit: MeasurementUnit) {
  return unit in DISTANCE_IN_METERS;
}

export function isTimeUnit(unit: MeasurementUnit) {
  return unit in TIME_IN_SECONDS;
}

export function convertMeasurement(
  value: number,
  from: MeasurementUnit,
  to: MeasurementUnit,
) {
  if (from === to) {
    return value;
  }

  if (isDistanceUnit(from) && isDistanceUnit(to)) {
    return (value * DISTANCE_IN_METERS[from]!) / DISTANCE_IN_METERS[to]!;
  }

  if (isTimeUnit(from) && isTimeUnit(to)) {
    return (value * TIME_IN_SECONDS[from]!) / TIME_IN_SECONDS[to]!;
  }

  throw new Error(`Cannot convert ${from} to ${to}`);
}
