# Development Roadmap (V1 -> V2)

> Last updated: 2026-04-27
>
> **Status**: V1 MVP and V1.1 polish are complete. V1.2 Track & Field depth is largely implemented with analytics backbone and assistant. V2 critical path (analytics, assistant, integrations scaffolding, multi-sport/multi-org) is implemented; focusing on UI validation surfaces and end-to-end testing.
>
> **Current priority**: Complete V2 validation by adding UI validation surfaces for analytics charts and testing end-to-end functionality with expanded seed data.
>
> **Verification snapshot**: `npm test`, `npm run lint`, and `npm run build` are green in the current environment. Analytics snapshots, APIs, and assistant are live. Rebuild tooling exists for analytics regeneration.
>
> **Big picture**: This roadmap is the status + sequencing document for the current project. Detailed planning references remain in the `plan_outline/` docs, but this file should stay in sync with what the repo actually contains today.

## 1. V1: Core MVP

### 1.1 Setup & base plumbing (done)
- [x] Confirm Next.js + TypeScript project compiles
- [x] Fix alias paths (`@/lib/prisma` etc.)
- [x] Run Prisma migration/generate flow for the current schema
- [x] NextAuth + credentials auth + role field in `User`
- [x] Seed AD + coach + athlete accounts
- [x] Core APIs for athletes, academics, health, events, notes, teams, and user settings
- [x] `lib/prisma.ts` client export
- [x] `app/lib/auth.ts` NextAuth + JWT session token wiring

### 1.2 Auth + RBAC wiring (done)
- [x] `role` in session + token callback
- [x] AD/Coach route guards
- [x] Server-side route protection on core coach pages
- [x] Athlete-aware redirects/navigation from `/`
- [x] Team/self-scoped access helpers for route-level ACL enforcement

### 1.3 Core UI pages (done)
- [x] `app/page.tsx`: redirect for logged-in users
- [x] `app/overview/page.tsx`: KPI cards, athletes requiring attention, upcoming events, calendar widget
- [x] `app/athletes/page.tsx`: roster CRUD with table/cards toggle
- [x] `app/academic-records/page.tsx`: academic records CRUD
- [x] `app/health-records/page.tsx`: health records CRUD
- [x] `app/events/page.tsx`: event list/form management
- [x] `app/notes/page.tsx`: notes CRUD + category filters
- [x] `app/settings/page.tsx`: user threshold/settings management

### 1.4 Business logic (done)
- [x] Eligibility rules via `lib/eligibility.ts`
- [x] Risk flag computation
- [x] Medical compliance status computation via `lib/medicalStatus.ts`
- [x] Dashboard aggregation helpers via `lib/dashboardData.ts`

### 1.5 UI finishing + QA
- [x] Add validation via Zod across the current API layer
- [x] Add shared API error handling helpers
- [x] Add route-level tests for auth, ACL, validation, notes update, settings save, dashboard loading, and Track & Field CRUD routes
- [x] Add React Query foundation (`Providers`, `QueryClientProvider`, Track & Field usage)
- [x] Add toast infrastructure via Sonner
- [x] Fix notes edit contract (`PUT /api/notes`)
- [x] Make lint actionable by ignoring generated Prisma output
- [x] Roll React Query + toast UX consistently through core CRUD pages outside the Track & Field module
- [x] Re-verify production build in an unrestricted environment or replace remote Google font fetching

---

## 2. V1.1: Stabilize + polish - IN PROGRESS

### 2.1 Workflow and data operations
- [ ] AD team setup + coach invites
- [ ] CSV import capability for athletes + academic records
- [x] Seed data tooling improved
- [x] Seed at least one athlete-linked login with track data
- [ ] Expand seed data so every athlete has academic history and more varied health/note/workout/ranking coverage

### 2.2 Calendar, navigation, and detail UX
- [x] Let users create, edit, and delete calendar entries according to role permissions
- [x] Coaches/ADs can create/edit/delete team-shared calendar events
- [x] Athletes can create/edit/delete only their own personal calendar entries
- [x] Coaches/ADs can read athlete personal calendar entries for athletes in scope
- [x] Team-created calendar entries are read-only in the athlete view
- [ ] Surface workouts/practices in calendar views alongside events
- [x] Add a calendar widget to the events page so users do not have to return to the dashboard to visualize entries
- [x] Make coach dashboard queue items clickable
- [x] Clicking an athlete in "Athletes Requiring Attention" opens athlete detail context with a deep link to the full athlete profile page
- [x] Clicking a dashboard event/calendar item opens event detail context with a deep link to the events page
- [x] Athlete roster table supports horizontal scrolling
- [x] Athlete card view should link directly to the athlete profile page
- [x] Add logout button to the coach dashboard
- [x] Add logout button to the settings page
- [x] Reduce on screen clutter for a tighter, more polished UI

### 2.3 Athlete profile, notes, and coach-side detail depth
- [x] Add an athlete profile/detail page that aggregates notes, academics, health, workouts, rankings, journals, and calendar context
- [x] Ensure athlete-attached notes always appear on that athlete's profile
- [x] Add `SPORT_SPECIFIC` as a note category alongside `GENERAL`, `MEDICAL`, and `ACADEMIC`
- [ ] Add better detail pages/drawers for note + history review flows
- [x] Improve modal/form flow consistency across core CRUD pages
- [ ] Add advanced filters and CSV export where useful

### 2.4 Athlete portal expansion
- [x] Athlete login flow is live
- [x] Athlete portal layout/navigation + guards are live
- [x] Athlete dashboard is live
- [x] Athlete journals page is live
- [x] Add `app/athlete-portal/calendar`
- [x] Add `app/athlete-portal/workouts`
- [x] Add `app/athlete-portal/academics`
- [x] Add `app/athlete-portal/medical`
- [x] Add `app/athlete-portal/settings`
- [x] Add athlete portal logout control
- [x] Athlete calendar should show coach-published entries as read-only plus athlete-owned personal entries

### 2.5 Academics and tutoring depth
- [ ] Add course-level academic detail for class names, grades, and semesters in addition to GPA snapshots
- [ ] Add a tutoring page/module with tutor name or organization, days, hours, and notes
- [ ] Make the academic records view easier to read at full detail, either with a toggleable detail mode or a dedicated detail page

### 2.6 Medical depth
- [x] Add an athlete medical page in the portal
- [ ] Include rehab exercises
- [ ] Include injury-prevention, status, attendance, and related medical notes/information
- [ ] Support mental-health-related medical context where appropriate within the existing role/privacy boundaries

### 2.7 Non-functional
- [x] Route-level ACL hardening across core APIs
- [x] Shared request parsing + error handling helpers
- [ ] Caching expansion beyond the current React Query foundation
- [ ] Error tracking (Sentry)
- [ ] E2E tests (Playwright)

### 2.8 Current verification / cleanup gaps
- [x] Replace `middleware.ts` with `proxy.ts` for Next.js 16 alignment
- [x] Investigate remaining build friction tied to remote font fetching during `next build`
- [x] Add consistent success/error UX across non-track CRUD pages

---

## 3. V1.2: Track & Field depth - IN PROGRESS

### 3.1 Data models & APIs (mostly in place)
- [x] `Sport` enum + `Team.sport`
- [x] `WorkoutTemplate`, `WorkoutInstance`, `WorkoutMetric`
- [x] `RankingSource`, `EventRanking`, `PersonalRecord`
- [x] `MeetEntry`, `AthleteJournal`
- [x] `MeasurementUnit`
- [x] Scoped APIs for workouts, rankings, PRs, meet entries, and journals

### 3.2 Coach Track & Field pages (live, with depth still needed)
- [x] `app/track-and-field/workouts`
- [x] `app/track-and-field/rankings`
- [x] `app/track-and-field/meet-entries`
- [x] `app/track-and-field/journals`
- [x] Edit/delete flows now exist for workouts, rankings, meet entries, and journals
- [ ] Clean up workouts page layout issues where controls overlap other sections

### 3.3 Workout groups, planning, and analytics
- [x] `lib/workoutAnalysis.ts` exists
- [x] `lib/unitConversion.ts` exists
- [ ] Wire planned-vs-actual analysis helpers into the workouts UI
- [ ] Add custom workout groups so coaches can save reusable athlete groups
- [ ] Let coaches add/remove athletes from those groups for workout assignment
- [ ] Add planned workout sessions and target-goal views
- [ ] Add three visual result states: above target, on target, below target
- [ ] Add adjustable target buffers for Track & Field performance classification
- [ ] Add workout history analytics/dashboard views
- [ ] Add charts for reps vs. time with planned overlay
- [ ] Add linear regression / projection views once the core planned-vs-actual UX is stable

### 3.4 Performance analytics + projections foundation
- [x] Define persisted analytics snapshot model(s) for workouts, PRs, and rankings
- [x] Build analytics service layer in `lib/` for normalization, rolling trends, deltas, readiness/classification rules, and projection math
- [x] Keep analytics deterministic and app-native in TypeScript instead of relying on an external analytics program or LLM-generated calculations
- [x] Recompute analytics snapshot data when workouts, PRs, or rankings change
- [x] Store AI-friendly summary outputs in addition to chart-friendly data so analytics can be reused without re-deriving context in prompts
- [x] Persist `AthletePerformanceSnapshot` for training status, recent deltas, readiness/risk flags, and analytics freshness metadata (when analytics were last recomputed)
- [x] Persist `EventPerformanceTrend` for athlete/event trend windows, baselines, recent averages, slope, and data-quality/confidence markers
- [x] Persist `WorkoutAnalyticsSnapshot` for planned-vs-actual classification totals, adherence %, rolling 7/14/30 day workout adherence and volume summaries, and recent progression markers
- [x] Add team/athlete analytics read endpoints for charts and future AI use
- [x] Add `GET /api/analytics/performance?teamId=...&athleteId=...`
- [x] Add `GET /api/analytics/projections?athleteId=...&eventName=...`
- [x] Add `GET /api/analytics/workouts?athleteId=...`
- [x] Add workout planned-vs-actual charts backed by stored analytics summaries
- [x] Add PR trend charts by athlete/event
- [x] Add ranking movement charts by athlete/event/source
- [x] Add deterministic projection views using simple regression and trend windows
- [x] Add data sufficiency/confidence rules so projections only appear when enough history exists
- [x] Label projections as trend-based estimates rather than guarantees
- [x] Keep advanced analytics in focused athlete/team workflows before promoting them to top-level dashboard defaults
- [x] Add rebuild/backfill tooling for analytics snapshots
- [x] Defer ML models or a separate prediction service until enough historical data exists to justify them
- [x] Defer more robust ML infrastructure for V2 (potential model training and creation done in python)

### 3.5 Rankings and journals depth
- [ ] Allow rankings to include relay entries in addition to individual athlete entries
- [ ] Let coaches create planner-style journal entries for themselves
- [ ] Let coaches select multiple athletes for feedback in one submission flow
- [ ] For multi-athlete private feedback, create one private copy per athlete from a single coach submission
- [ ] Define or defer the multi-athlete shared-visibility policy explicitly before implementation

---

## 4. V2: AI, integrations, multi-sport, and multi-org infrastructure - IN PROGRESS

### 4.1 AI assistant module
- [x] `app/api/assistant/query/route.ts`: LLM context builder and chat endpoint
- [x] Compose context from athlete snapshots plus academic/health/event/workout data
- [x] Read persisted analytics snapshots as the primary performance-analysis context before drilling into raw workouts, PRs, or rankings
- [x] Reference stored projections, trend windows, and readiness summaries in assistant output instead of generating analytics inside the prompt
- [x] LLM wrapper with rate limiting and permission checks
- [x] Global assistant widget + page-specific contextual prompts
- [x] Smart insights, recommendations, summarization, and analysis

### 4.2 External integrations (need to figure out best way of implementing)
- [x] Milesplit sync for ranking imports (scaffolded)
- [x] Timing system integrations for meet result imports (scaffolded)
- [x] Race entry APIs for coach search/sign-up workflows (scaffolded)
- [x] Integration scheduling + error handling (scaffolded with IntegrationRun model)

### 4.3 Multi-sport + multi-org infrastructure
- [x] Schema expansion for institution/season/multi-sport structures
- [x] Sport-specific data inheritance + unit conventions
- [x] Reusable patterns for workouts, journals, rankings, and dashboards across sports
- [x] Standardized sports plugin/folder structure
- [x] AD cross-sport dashboard + sport-scoped data views

### 4.4 Scale & infrastructure
- [ ] Multi-team + multi-institution filters and switching
- [ ] Import queues + bulk operations
- [ ] Read replicas / pooling / metrics if needed

---

## 5. Fast follow checkboxes

### Weekly check-ins
- [ ] What works
- [ ] What bottleneck exists
- [ ] Test coverage + critical path
- [ ] Deployment status on Vercel

### Current verification snapshot
- [x] `npm test`
- [x] `npm run lint`
- [x] `npm run build`

### Reference planning docs
- [ ] Keep `plan_outline/plan_current_April_02.md` aligned with the current roadmap when implementation sequencing materially changes
