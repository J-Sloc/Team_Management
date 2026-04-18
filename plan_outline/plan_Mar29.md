## Updated Plan: Incorporating Your Notes

Thanks for the clarifications—I've updated the plan to reflect the role-based landing pages and customizable filters/settings. Here's the revised step-by-step plan (saved to `/memories/session/plan.md` for persistence).

---

## Plan: Align Implementation with `plan_outline` and Next Steps

TL;DR: Phase 1 and Phase 2 from the outline are already done; Phase 3 (role-aware Overview + customizable settings + dashboard logic + drill-down pages) is the next focus.

### 1. Status vs plan_outline
- Phase 1: done
  - `prisma/seed.ts`: created with 10 athletes, roles, events, health/academic records
  - `lib/rbac.ts`: done and used by API routes
  - `app/api/athletes/route.ts`: fully guarded with GET/POST/PUT/DELETE
  - `app/athletes/page.tsx`: role guard and forms exist
- Phase 2: done
  - `app/api/academic-records/route.ts`: full CRUD + filters
  - `app/api/health-records/route.ts`: full CRUD + filters
  - `app/api/events/route.ts`: full CRUD + filters
  - `app/api/notes/route.ts`: full CRUD + filters
  - `app/api/teams/route.ts`: GET guard
- Phase 3: partially done
  - No `app/overview` page exists yet
  - No dashboard library methods (`lib/eligibility.ts`, `lib/medicalStatus.ts`, `lib/dashboardData.ts`) yet
  - No user settings model or page yet

### 2. Must-fix gaps before advanced user stories
1. Create `app/overview/page.tsx` (server component) with role-aware dashboard cards and lists (AD sees all teams; Coach sees their team(s))
2. Create `lib/dashboardData.ts` as data aggregator API for overview, reusing existing endpoints/prisma, with role/team filtering
3. Create `lib/eligibility.ts` + `lib/medicalStatus.ts` (business logic) for action recommendations, using user-customizable thresholds
4. Add user settings model (e.g., `UserSettings` in Prisma) for customizable filters/thresholds
5. Add settings page (`app/settings/page.tsx`) for editing preferences (GPA thresholds, medical statuses, etc.)
6. Add fallback `app/overview/layout.tsx` and route security for COACH|AD
7. Update User model to support multiple teams for coaches (e.g., add `teams` array or junction table)
8. Add pagination/filter hooks to `/athletes` and to new overview to prevent scaling issues
9. Add tests for: role guard, API filtering, overview data model, settings persistence

### 3. Step-by-step plan (agent mode implementable)

#### A. Setup and Schema Updates (1 day)
- Confirm `npm run db:seed` works now and add docs note.
- Update Prisma schema: Add `UserSettings` model with fields like `gpaThresholds`, `medicalStatuses`, `defaultFilters`
- Update User model: Change `teamId` to `teams` (array of teamIds) to support coaches with multiple teams
- Run migration: `npx prisma migrate dev --name add_user_settings_and_multi_team`
- Update seed to include sample settings and multi-team coaches

#### B. Business logic helpers (1 day)
- `lib/eligibility.ts`: function `getEligibility(athlete, academicRecords, userSettings)`
  - Use `userSettings.gpaThresholds` instead of hardcoded: e.g., `gpa < userSettings.ineligibleGpa -> ineligible`
  - Include `riskFlag` and `complianceStatus` boosts
- `lib/medicalStatus.ts`: function `getMedicalClearance(healthRecords, userSettings)`
  - Use `userSettings.medicalStatuses` for custom rules (e.g., attendance threshold)
- `lib/dashboardData.ts`:
  - `getTeamDashboard(userRole, userTeams)` returning aggregated KPI data for AD (all teams) or Coach (their teams)
  - `getAthletesNeedingAttention(userRole, userTeams, limit=5, userSettings)` sorting by risk and eligibility using custom thresholds
  - `getUpcomingEvents(userRole, userTeams, nearDays=30)`

#### C. `Overview` route & UI (2 days)
- Create `app/overview/page.tsx`, server component, secure with `auth()` and `requireRole(session, "COACH", "AD")`
- Fetch user settings and teams from session/user
- Fetch aggregated data from route fns in `lib/dashboardData.ts` based on role/teams
- Render:
  - KPIs: avg GPA, ineligible, at-risk, medical not-cleared (using custom thresholds)
  - Table: top 5 urgent athletes (filtered by user prefs)
  - List: next 5 upcoming home/away events for user's teams
- Add secure redirect to login/403 if unauthorized
- Create `app/overview/layout.tsx` for shared design

#### D. Settings Page (1 day)
- Create `app/settings/page.tsx` (client component with forms)
- Allow editing: GPA thresholds, medical status rules, default filters
- Save to `/api/user-settings` (new endpoint: POST/PUT)
- Role guard: COACH|AD only

#### E. Add incremental UI pages conversion (1-2 days)
- Add from plan outline: `app/academic-records/page.tsx`, `app/health-records/page.tsx`, `app/events/page.tsx`, `app/notes/page.tsx` if not present (not yet in repo)
- Use existing API routes, with form + list + filters (make filters customizable via settings)

#### F. Validation and cleanup (ongoing)
- Auto-fix lint, run typecheck
- Add database index check in Prisma schema — already good
- Ensure roles are correctly enforced in all pages
- Test multi-team coach scenarios

### 4. Verified endpoints & behavior to test
- `/api/athletes` supports GET/POST/PUT/DELETE
- `/api/academic-records` and `/api/health-records` and `/api/events` and `/api/notes` - full CRUD and security
- `/api/teams` GET works with COACH/AD session
- `/api/user-settings` (new) for settings CRUD
- Overview page: AD sees all teams; Coach sees their teams; uses custom settings
- Settings page saves and applies to dashboard

### 5. Optional Phase 4 expansion (after this is stable)
- Add `React Query` caches
- Add forms and zod schema validations
- Add analytics and notifications for risk change
- Add persisted performance analytics snapshots for workouts, PRs, and rankings so charts and future AI context use the same computed data
- Add deterministic projection math first, with AI consuming stored trend summaries later rather than generating analytics directly
- Add CSV import/exports

---

This plan incorporates your notes: role-aware dashboards (AD all teams, Coach their teams, handling multi-sport coaches), and customizable filters/thresholds via a settings page. The User model update supports multiple teams for coaches.

Ready for handoff to agent mode when you approve! Let me know if you'd like any adjustments.
