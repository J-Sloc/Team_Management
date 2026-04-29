import prisma from "@/lib/prisma";
import { createApiError } from "./api";

export const integrationProviders = {
  milesplit: {
    key: "MILESPLIT",
    label: "Milesplit",
    description: "Ranking import scaffold for meet and performance feeds.",
  },
  "timing-system": {
    key: "TIMING_SYSTEM",
    label: "Timing System",
    description: "Meet result import scaffold for timing and finish data.",
  },
  "race-entry": {
    key: "RACE_ENTRY",
    label: "Race Entry",
    description: "Coach race-entry search and signup scaffold.",
  },
} as const;

export type IntegrationProviderSlug = keyof typeof integrationProviders;

export function resolveIntegrationProvider(provider: string) {
  if (!(provider in integrationProviders)) {
    throw createApiError(404, "Integration provider not found.");
  }

  return integrationProviders[provider as IntegrationProviderSlug];
}

export async function createIntegrationRun({
  provider,
  triggerType,
  triggeredByUserId,
  scopeJson,
}: {
  provider: string;
  triggerType: string;
  triggeredByUserId: string;
  scopeJson?: Record<string, unknown>;
}) {
  const run = await prisma.integrationRun.create({
    data: {
      provider,
      triggerType,
      status: "PENDING",
      triggeredByUserId,
      scopeJson: (scopeJson ?? undefined) as any,
    },
  });

  return prisma.integrationRun.update({
    where: { id: run.id },
    data: {
      status: "COMPLETED",
      finishedAt: new Date(),
      resultSummary: {
        message: "Integration scaffold run completed. Provider-specific import logic is ready for the next iteration.",
      },
    },
  });
}
