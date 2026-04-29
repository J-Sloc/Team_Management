"use client";

import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CoachPageHeader from "@/app/components/CoachPageHeader";
import {
  apiJson,
  invalidateQueryKeys,
  toApiErrorMessage,
  toJsonBody,
} from "@/lib/clientApi";
import { integrationProviders } from "@/lib/integrations";

type IntegrationRun = {
  id: string;
  provider: string;
  triggerType: string;
  status: string;
  startedAt: string;
  finishedAt?: string | null;
  resultSummary?: { message?: string } | null;
};

type ProviderResponse = {
  provider: {
    key: string;
    label: string;
    description: string;
  };
  runs: IntegrationRun[];
};

const providerEntries = Object.entries(integrationProviders);

export default function IntegrationsClient() {
  const queryClient = useQueryClient();

  const providerQueries = useQueries({
    queries: providerEntries.map(([slug]) => ({
      queryKey: ["integrationRuns", slug],
      queryFn: () => apiJson<ProviderResponse>(`/api/integrations/${slug}`),
    })),
  });

  const triggerMutation = useMutation({
    mutationFn: ({ slug }: { slug: string }) =>
      apiJson(`/api/integrations/${slug}`, {
        method: "POST",
        body: toJsonBody({ triggerType: "MANUAL" }),
      }),
    onSuccess: async (_data, variables) => {
      await invalidateQueryKeys(queryClient, [["integrationRuns", variables.slug]]);
      toast.success("Integration scaffold run recorded.");
    },
    onError: (error) => {
      toast.error(toApiErrorMessage(error));
    },
  });

  return (
    <div className="space-y-6">
      <CoachPageHeader
        title="Integrations"
        description="Provider scaffolding is live here first. Each run records status, timing, and result notes before the full import logic lands."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {providerEntries.map(([slug, provider], index) => {
          const query = providerQueries[index];
          const runs = query.data?.runs ?? [];

          return (
            <section key={slug} className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{provider.label}</h2>
              <p className="mt-1 text-sm text-slate-500">{provider.description}</p>
              <button
                type="button"
                onClick={() => triggerMutation.mutate({ slug })}
                disabled={triggerMutation.isPending}
                className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {triggerMutation.isPending ? "Running..." : "Run Scaffold"}
              </button>
              {query.isError ? (
                <p className="mt-4 text-sm text-rose-600">{toApiErrorMessage(query.error)}</p>
              ) : query.isLoading ? (
                <p className="mt-4 text-sm text-slate-500">Loading runs...</p>
              ) : runs.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No runs recorded yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {runs.map((run) => (
                    <div key={run.id} className="rounded-lg border border-slate-200 p-4">
                      <p className="text-sm font-medium text-slate-900">
                        {run.status} • {run.triggerType}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Started {new Date(run.startedAt).toLocaleString()}
                      </p>
                      {run.resultSummary?.message ? (
                        <p className="mt-2 text-sm text-slate-700">{run.resultSummary.message}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
