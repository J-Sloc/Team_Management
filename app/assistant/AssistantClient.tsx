"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { apiJson, toApiErrorMessage, toJsonBody } from "@/lib/clientApi";

type Scope = "global" | "athlete" | "performance";

type AssistantResponse = {
  reply: string;
  provider: string;
  model?: string | null;
  context: unknown;
};

const promptsByScope: Record<Scope, string[]> = {
  global: [
    "Summarize the most important current risk areas in the program.",
    "What performance context should I review first today?",
  ],
  athlete: [
    "Give me a concise overview of this athlete.",
    "What are the biggest academic, medical, or training concerns for this athlete?",
  ],
  performance: [
    "Summarize this athlete's performance trend and workload adherence.",
    "What does the current workout and PR trend suggest I should monitor next?",
  ],
};

export default function AssistantClient({
  initialScope,
  initialAthleteId,
  initialTeamId,
  initialPrompt,
  backHref,
}: {
  initialScope: Scope;
  initialAthleteId: string;
  initialTeamId: string;
  initialPrompt: string;
  backHref: string;
}) {
  const [scope, setScope] = useState<Scope>(initialScope);
  const [athleteId, setAthleteId] = useState(initialAthleteId);
  const [teamId, setTeamId] = useState(initialTeamId);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [response, setResponse] = useState<AssistantResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const promptSuggestions = useMemo(() => promptsByScope[scope], [scope]);

  async function handleSubmit() {
    if (!prompt.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const body: any = {
        prompt: prompt.trim(),
        scope,
      };
      if (athleteId) body.athleteId = athleteId;
      if (teamId) body.teamId = teamId;

      const result = await apiJson<AssistantResponse>("/api/assistant/query", {
        method: "POST",
        body: toJsonBody(body),
      });
      setResponse(result);
    } catch (error) {
      toast.error(toApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Assistant</h1>
            <p className="mt-1 text-sm text-slate-500">
              Read-only assistant responses use stored analytics snapshots first and raw data only when needed for added detail.
            </p>
          </div>
          <Link
            href={backHref}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <select
            value={scope}
            onChange={(event) => setScope(event.target.value as Scope)}
            className="rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="global">Global</option>
            <option value="athlete">Athlete</option>
            <option value="performance">Performance</option>
          </select>
          <input
            value={athleteId}
            onChange={(event) => setAthleteId(event.target.value)}
            placeholder="Athlete ID (optional)"
            className="rounded-md border border-slate-300 px-3 py-2"
          />
          <input
            value={teamId}
            onChange={(event) => setTeamId(event.target.value)}
            placeholder="Team ID (optional)"
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setPrompt(suggestion)}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask for a scoped athlete or performance summary."
          rows={5}
          className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isSubmitting ? "Thinking..." : "Ask Assistant"}
        </button>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Response</h2>
          {response ? (
            <span className="text-xs uppercase tracking-wide text-slate-500">
              {response.provider}
              {response.model ? ` • ${response.model}` : ""}
            </span>
          ) : null}
        </div>
        {response ? (
          <div className="mt-4 space-y-4">
            <p className="whitespace-pre-wrap text-sm text-slate-700">{response.reply}</p>
            <details className="rounded-lg border border-slate-200 p-4">
              <summary className="cursor-pointer text-sm font-medium text-slate-700">
                Context payload
              </summary>
              <pre className="mt-3 overflow-x-auto text-xs text-slate-600">
                {JSON.stringify(response.context, null, 2)}
              </pre>
            </details>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">
            No response yet. Start with a scoped athlete or performance question for the best result.
          </p>
        )}
      </section>
    </div>
  );
}
