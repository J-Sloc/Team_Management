"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [settings, setSettings] = useState<UserSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }
    if (!["COACH", "AD"].includes(session.user?.role || "")) {
      router.push("/");
      return;
    }

    fetchSettings();
  }, [session, status, router]);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/user-settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    setSaving(true);
    try {
      const method = settings.gpaThresholds ? "PUT" : "POST";
      const res = await fetch("/api/user-settings", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Save failed");
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  function updateGpaThresholds(key: 'ineligible' | 'atRisk', value: string) {
    const numValue = parseFloat(value);
    setSettings(prev => ({
      ...prev,
      gpaThresholds: {
        ineligible: prev.gpaThresholds?.ineligible ?? 2.0,
        atRisk: prev.gpaThresholds?.atRisk ?? 2.5,
        [key]: isNaN(numValue) ? 0 : numValue,
      },
    }));
  }

  function updateMedicalStatuses(key: 'attendanceThreshold', value: string) {
    const numValue = parseInt(value);
    setSettings(prev => ({
      ...prev,
      medicalStatuses: {
        ...prev.medicalStatuses,
        [key]: isNaN(numValue) ? 0 : numValue,
      }
    }));
  }

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading settings...</div>;
  }

  if (!session || !["COACH", "AD"].includes(session.user?.role || "")) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">403 - Forbidden</h1>
          <p className="text-slate-600 mb-4">You do not have permission to access this page.</p>
          <Link href="/overview" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <Link href="/overview" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Customize your dashboard thresholds and filters
            </p>
          </div>

          <div className="px-6 py-6 space-y-8">
            {/* GPA Thresholds */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">GPA Eligibility Thresholds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ineligible GPA Threshold
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={settings.gpaThresholds?.ineligible ?? 2.0}
                    onChange={(e) => updateGpaThresholds('ineligible', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Athletes below this GPA are considered ineligible
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    At-Risk GPA Threshold
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={settings.gpaThresholds?.atRisk ?? 2.5}
                    onChange={(e) => updateGpaThresholds('atRisk', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Athletes between ineligible and at-risk are monitored
                  </p>
                </div>
              </div>
            </div>

            {/* Medical Statuses */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Medical Clearance Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Attendance Threshold (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.medicalStatuses?.attendanceThreshold ?? 80}
                    onChange={(e) => updateMedicalStatuses('attendanceThreshold', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum attendance percentage for medical clearance
                  </p>
                </div>
              </div>
            </div>

            {/* Default Filters */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Default Dashboard Filters</h2>
              <p className="text-sm text-gray-600 mb-4">
                These filters will be applied by default on your dashboard views.
                (Advanced filtering can be implemented later)
              </p>
              <div className="text-sm text-gray-500">
                Default filters will be configurable here in future updates.
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={saveSettings}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}