import { auth } from "@/app/lib/auth";
import { requireRole } from "@/lib/rbac";
import prisma from "@/lib/prisma";
import { getTeamDashboard, getAthletesNeedingAttention, getUpcomingEvents } from "@/lib/dashboardData";
import { redirect } from "next/navigation";
import CalendarWidget from "./CalendarWidget";

export default async function OverviewPage() {
  const session = await auth();
  const guardError = requireRole(session, "COACH", "AD");
  if (guardError) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: { userSettings: true }
  });

  if (!user) {
    redirect("/login");
  }

  // For AD, get all teams with details; for Coach, get their assigned teams
  const teams = user.role === "AD"
    ? await prisma.team.findMany({
        include: {
          _count: {
            select: { athletes: true, events: true }
          }
        }
      })
    : await prisma.team.findMany({
        where: { id: { in: user.teams } },
        include: {
          _count: {
            select: { athletes: true, events: true }
          }
        }
      });

  const userTeams = teams.map(t => t.id);

  const userSettings = user.userSettings ? {
    gpaThresholds: user.userSettings.gpaThresholds as { ineligible: number; atRisk: number } | undefined,
    medicalStatuses: user.userSettings.medicalStatuses as { attendanceThreshold: number } | undefined,
    defaultFilters: user.userSettings.defaultFilters as Record<string, unknown> | undefined,
  } : {};

  // Fetch dashboard data
  const metrics = await getTeamDashboard(user.role as "AD" | "COACH", userTeams, userSettings);
  const urgentAthletes = await getAthletesNeedingAttention(user.role as "AD" | "COACH", userTeams, userSettings, 5);
  const upcomingEvents = await getUpcomingEvents(user.role as "AD" | "COACH", userTeams, 30);

  const calendarEvents = upcomingEvents.map((e) => ({
    ...e,
    startTime: e.startTime.toISOString(),
  }));

  return (
    <div className="bg-secondary min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {user.role === "AD" ? (
            // AD View: Team-based organization with overhead focus
            <>
              <div className="bg-card p-6 rounded-lg shadow border">
                <h1 className="text-2xl font-bold text-primary mb-4">Team Management Overview</h1>
                <p className="text-secondary">Comprehensive view across all teams</p>
              </div>

              {/* Overall KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary">Total Athletes</h3>
                  <p className="text-3xl font-bold text-blue-600">{metrics.totalAthletes}</p>
                  <p className="text-sm text-muted">Across {teams.length} teams</p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary">Ineligible</h3>
                  <p className="text-3xl font-bold text-red-600">{metrics.ineligibleCount}</p>
                  <p className="text-sm text-muted">Require attention</p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary">At Risk</h3>
                  <p className="text-3xl font-bold text-yellow-600">{metrics.atRiskCount}</p>
                  <p className="text-sm text-muted">Monitor closely</p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary">Medical Issues</h3>
                  <p className="text-3xl font-bold text-orange-600">{metrics.medicalNotClearedCount}</p>
                  <p className="text-sm text-muted">Not fully cleared</p>
                </div>
              </div>

              {/* Team-by-team breakdown */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-primary">Team Breakdown</h2>
                {teams.map((team) => (
                  <div key={team.id} className="bg-card p-6 rounded-lg shadow border">
                    <h3 className="text-lg font-medium text-primary mb-4">{team.name} ({team.sport})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{team._count.athletes}</p>
                        <p className="text-sm text-muted">Athletes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{metrics.avgGpa.toFixed(2)}</p>
                        <p className="text-sm text-muted">Avg GPA</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{team._count.events}</p>
                        <p className="text-sm text-muted">Events</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card p-6 rounded-lg shadow border">
                <h2 className="text-xl font-semibold text-primary mb-4">Schedule Calendar</h2>
                <CalendarWidget events={calendarEvents} />
              </div>
            </>
          ) : (
            // Coach View: Focused on their teams
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary">Average GPA</h3>
                  <p className="text-3xl font-bold text-blue-600">{metrics.avgGpa.toFixed(2)}</p>
                  <p className="text-sm text-muted">Across {metrics.totalAthletes} athletes</p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary">Ineligible</h3>
                  <p className="text-3xl font-bold text-red-600">{metrics.ineligibleCount}</p>
                  <p className="text-sm text-muted">Require attention</p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary">At Risk</h3>
                  <p className="text-3xl font-bold text-yellow-600">{metrics.atRiskCount}</p>
                  <p className="text-sm text-muted">Monitor closely</p>
                </div>

                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary">Medical Issues</h3>
                  <p className="text-3xl font-bold text-orange-600">{metrics.medicalNotClearedCount}</p>
                  <p className="text-sm text-muted">Not fully cleared</p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow border">
                <h2 className="text-xl font-semibold text-primary mb-4">Schedule Calendar</h2>
                <CalendarWidget events={calendarEvents} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Athletes Needing Attention */}
                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary mb-4">Athletes Requiring Attention</h3>
                  {urgentAthletes.length === 0 ? (
                    <p className="text-muted">No athletes currently requiring attention.</p>
                  ) : (
                    <div className="space-y-3">
                      {urgentAthletes.map((athlete) => (
                        <div key={athlete.id} className="border rounded p-3 bg-card">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-primary">{athlete.name}</h4>
                              <p className="text-sm text-secondary">{athlete.eligibilityReason}</p>
                              {athlete.medicalReason !== "No medical issues" && (
                                <p className="text-sm text-secondary">{athlete.medicalReason}</p>
                              )}
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${
                              athlete.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                              athlete.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {athlete.riskLevel.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upcoming Events */}
                <div className="bg-card p-6 rounded-lg shadow border">
                  <h3 className="text-lg font-medium text-primary mb-4">Upcoming Events</h3>
                  {upcomingEvents.length === 0 ? (
                    <p className="text-muted">No upcoming events.</p>
                  ) : (
                    <div className="space-y-3">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="border rounded p-3 bg-card">
                          <h4 className="font-medium text-primary">{event.title}</h4>
                          <p className="text-sm text-secondary">
                            {event.startTime.toLocaleDateString()} at {event.startTime.toLocaleTimeString()}
                          </p>
                          {event.location && (
                            <p className="text-sm text-secondary">{event.location}</p>
                          )}
                          {event.opponent && (
                            <p className="text-sm text-secondary">vs {event.opponent}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}