"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LogoutButton from "@/app/components/LogoutButton";
import { apiJson, toApiErrorMessage, toJsonBody } from "@/lib/clientApi";

interface UserSettings {
  gpaThresholds?: {
    ineligible: number;
    atRisk: number;
  };
  medicalStatuses?: {
    attendanceThreshold: number;
  };
  defaultFilters?: Record<string, unknown>;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [draftSettings, setDraftSettings] = useState<UserSettings | null>(null);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/login");
      return;
    }

    if (!["COACH", "AD"].includes(session.user?.role || "")) {
      router.push("/");
    }
  }, [router, session, status]);

  const settingsQuery = useQuery({
    queryKey: ["user-settings"],
    queryFn: () => apiJson<UserSettings>("/api/user-settings"),
    enabled: Boolean(session && ["COACH", "AD"].includes(session.user?.role || "")),
  });

  const settings: UserSettings =
    draftSettings ??
    {
      gpaThresholds: settingsQuery.data?.gpaThresholds ?? {
        ineligible: 2,
        atRisk: 2.5,
      },
      medicalStatuses: settingsQuery.data?.medicalStatuses ?? {
        attendanceThreshold: 80,
      },
      defaultFilters: settingsQuery.data?.defaultFilters ?? {},
    };

  const saveSettingsMutation = useMutation({
    mutationFn: (payload: UserSettings) => {
      const method = settingsQuery.data ? "PUT" : "POST";
      return apiJson<UserSettings>("/api/user-settings", {
        method,
        body: toJsonBody(payload as never),
      });
    },
    onSuccess: () => {
      toast.success("Settings saved.");
    },
    onError: (error) => {
      toast.error(toApiErrorMessage(error));
    },
  });

  function updateGpaThresholds(key: "ineligible" | "atRisk", value: string) {
    const parsed = Number(value);
    setDraftSettings((current) => ({
      ...(current ?? settings),
      gpaThresholds: {
        ineligible: current?.gpaThresholds?.ineligible ?? settings.gpaThresholds?.ineligible ?? 2,
        atRisk: current?.gpaThresholds?.atRisk ?? settings.gpaThresholds?.atRisk ?? 2.5,
        [key]: Number.isNaN(parsed) ? 0 : parsed,
      },
    }));
  }

  function updateMedicalStatuses(value: string) {
    const parsed = Number(value);
    setDraftSettings((current) => ({
      ...(current ?? settings),
      medicalStatuses: {
        attendanceThreshold: Number.isNaN(parsed) ? 0 : parsed,
      },
    }));
  }

  if (status === "loading" || settingsQuery.isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading settings...</div>;
  }

  if (!session || !["COACH", "AD"].includes(session.user?.role || "")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Customize dashboard thresholds and account controls.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/overview"
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  Back to Dashboard
                </Link>
                <LogoutButton className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700" />
              </div>
            </div>
          </div>

          <div className="space-y-8 px-6 py-6">
            <div>
              <h2 className="mb-4 text-lg font-medium text-gray-900">GPA Eligibility Thresholds</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Ineligible GPA Threshold
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={settings.gpaThresholds?.ineligible ?? 2}
                    onChange={(event) => updateGpaThresholds("ineligible", event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    At-Risk GPA Threshold
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={settings.gpaThresholds?.atRisk ?? 2.5}
                    onChange={(event) => updateGpaThresholds("atRisk", event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-medium text-gray-900">Medical Clearance Settings</h2>
              <div className="max-w-md">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Appointment Attendance Threshold (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.medicalStatuses?.attendanceThreshold ?? 80}
                  onChange={(event) => updateMedicalStatuses(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-medium text-gray-900">Default Dashboard Filters</h2>
              <p className="text-sm text-gray-600">
                Placeholder for saved filter presets. This page is now on the shared query/toast
                pattern, so expanding it later will not require another UI rewrite.
              </p>
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={() => saveSettingsMutation.mutate(settings)}
              disabled={saveSettingsMutation.isPending}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saveSettingsMutation.isPending ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
