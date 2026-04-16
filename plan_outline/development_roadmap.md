# Development Roadmap (V1 → V2)

  To-do: 2026-04-16
    - enable users t0 create, edit, and delete calendar events that they have permission to (coach & cooaching staff can create/edit/delete events that are shared across the entire team, athletes can only create/edit/delete items that are limited to their individual account and that are not shared out to the rest of the team, although coaches and coaching staff can see/read the calanders of individual athletes)
    - on the dashboard screen for the coach login, everything displayed should be clickable/linked to it's corresponding page. For example, under "Athletes Requiring Attention", the coach should be able to click each athlete's name that should ooopen up a card displaying the relevant athlete information, with an option to take the coach to the athlete's profile page in order to see all of the athlete's information. For events on the calandar, they should also open up in the same way. 
    - workouts/practices should be also visible on the calandar as events
    - the athlete's page should enable side scrolling to include all information for each athlete in the table view. The card view should enable the user to click and be brought to the player's page.
    - for academics, create detailed views of class names, grades, and semesters, in addition to GPA. Also add a tutoring page, with tutor name/organization, days, and hours so that student athletes can track tutoring if they need to, and so that coaches can see as well. The records table should also be toggleable (potentially to bring to a new page) to allow easy reading of all academic information. 
    - on the events page, make it so there's a calandar widget oon the page so users can visualize the entries without having to go back to the dashboard.
    - make sure all notes under a player are attached to that player, so they show up when looking at their profile. Also, include a "sport specific" category as well to add on to "general", "medical", and "academic".
    - for the workouts page, include an option for the coach to create custom Groups (for example, for our track and field team, "short sprinters - boys", "short sprinters - girls", "middle distance", etc.) so that they are able to add and remove athletes from for a given workout. This is intended to create an easier way for coaches to be able to enter workout data for all their athletes without it being quite as tedious. Add another section that allows the coach to see the planned workout sessions and the target goals. (maybe for a later stage) Include 3 color coded metrics (to help with projections coming later) for if an athlete performs above expectations, at expectations (target), or below expectations (underperformance). Since each sport will have unique aspects of workouts, and we're focusing on building out track and field first, have a spot for target times, with an adjustable buffer for exeeding and underperforming. Also, revise the UI for this page, as certain buttons are overhanging into other sections (like the "remove" button).
    - for rankings, in addition to individual athlete names, enable coaches to put relays on there as well (boys 4x100 for example)
    - for journals, allow coaches to create journals for themselves (or maybe it would be better to label it as a planner? not sure). Also allow coaches to select multiple athletes at a time for feedback. If multiple atheltes are selected, the "private/public" visibility toggle should still work accoordingly. I thinnk if it's private, a copy of the feedback should be sent to each athlete privately, just saving the coach time from having to retype or copy/paste the same thing over to resubmit. I'm not sure how the "shared" toggle should be handled as a whole just yet, regardless of the situation.
    - add a logout button to the settings page and the dashboard page.
    - for the athlete view, make plans to add an academic page with complete academic information, as well as tutoring details.
    - for the athlete view, make plans to add a medical page with rehab exercises, and other medical notes/information in relation to injury prevention, mental health, status, attendance information, etc.
    - for the athlete view, add a workouts page so they can track and access all of the workouts shared with them by their coach, as well as the same projections that will be implemented on the coaching side of things.
    - for the athlete view, add a settings page and a logout button.
    - for the athlete view, also include a calandar that is populated and updated by additions pushed out by the coaches. All entries populated/created by the coaches should be read only for the athletes, but the athletes should be able to make entries for their own thigns they'd like to add to the schedule (i.e. tutoring, personal training, homework, etc)
    - expand seed data to populate more cases to check

> Last updated: 2026-04-08
> 
> **Status**: Core coach/AD MVP is functional and the first stabilization pass is complete. API auth/scope hardening, Zod validation, lint cleanup, route-level tests, Track & Field coach pages, and the first athlete portal screens are now implemented. The next priority is polish and depth rather than raw scaffolding.
>
> **Big Picture**: This roadmap is the guiding checklist for milestones. See the referenced planning docs for task-level detail and execution sequences.


## 1. V1: Core MVP (4–6 weeks)

### 1.1 Setup & base plumbing (done)
- [x] Confirm Next.js + TypeScript project compiles
- [x] Fix alias paths (`@/lib/prisma` etc)
- [x] Run `npx prisma migrate dev` / `npx prisma generate`
- [x] NextAuth + credentials auth / role field in User model
- [x] Seed users: AD + Coach + Athlete + Medical + Event + Note
- [x] API routes:
  - `app/api/athletes/route.ts` (GET, POST, PATCH, DELETE)
  - `app/api/academic-records/route.ts`
  - `app/api/health-records/route.ts`
  - `app/api/events/route.ts`
  - `app/api/notes/route.ts`
- [x] `lib/prisma.ts` client export
- [x] `app/lib/auth.ts` NextAuth + JWT session token

### 1.3 Auth + RBAC wiring (done)
- [x] `role` in session + token callback
- [x] AD/Coach guard for routes
- [x] Server-side check in `app/overview` and `app/athletes`
- [x] Athlete-aware redirects/navigation (`/` routes athletes into portal)
- [x] Team/self-scoped access helpers for route-level ACL enforcement

### 1.4 UI pages v1 (done)
**Core Dashboard & Management Pages** (AD/Coach view)
- [x] `app/page.tsx`: redirect to `/overview` for logged-in users
- [x] `app/overview/page.tsx`: KPI cards, athletes requiring attention, recent events
- [x] `app/athletes/page.tsx`: Roster table with filters and CRUD
- [x] `app/academic-records/page.tsx`: Academic records table + filters
- [x] `app/health-records/page.tsx`: Medical records table + filters
- [x] `app/events/page.tsx`: Event calendar/list management
- [x] `app/notes/page.tsx`: Notes interface with categorization
- [x] `app/settings/page.tsx`: User-specific threshold/settings management

**Detail**: See [plan_current_April_02.md](plan_current_April_02.md) for the current execution sequence.

### 1.5 Business logic (done)
- [x] Eligibility rules (GPA thresholds) via `lib/eligibility.ts`
- [x] Risk flag computation with query fields
- [x] Medical compliance status via `lib/medicalStatus.ts`
- [x] At-risk dataset for the AD/Coach queue via `lib/dashboardData.ts`

### 1.6 UI finishing + QA (days 13–18)
- [ ] Use React Query (TanStack Query)
- [ ] Add toast/error handling
- [x] Add validation via Zod
- [x] Add basic tests for API routes
- [x] Fix notes edit contract (`PUT /api/notes`)
- [x] Make lint actionable by ignoring generated Prisma output
- [x] Verify green checks: `vitest`, `eslint`, and production build

---

## 1.7 Track & Field Module (V1 + V1.1) — PARTIALLY STARTED

### 1.7.1 Data models & API stubs (V1)
**Goal**: Establish data models for workouts, rankings, PRs, meet entries, and athlete journals. Build foundation for coach/athlete access control.

**Models to add**:
- [x] `Sport` enum + update `Team.sport` to use it
- [x] `WorkoutTemplate`, `WorkoutInstance`, `WorkoutMetric` (with JSON parameter customization)
- [x] `RankingSource`, `EventRanking`, `PersonalRecord`
- [x] `MeetEntry`, `AthleteJournal` (coach + athlete read/write, scoped by team/self)
- [x] `MeasurementUnit` (distance/time unit conversions by sport: meters, kilometers, yards, etc.)

**API stubs**:
- [x] `app/api/workouts/route.ts` (GET, POST with coach/athlete auth check)
- [x] `app/api/rankings/route.ts` (GET with scoped reads, POST for sources + ranking entries)
- [x] `app/api/prs/route.ts` (GET, POST athlete PRs)
- [x] `app/api/meet-entries/route.ts` (GET, POST structured entries; CSV deferred)
- [x] `app/api/journals/route.ts` (GET, POST with coach/athlete-only policy)

**Auth**: `ATHLETE` role is in schema/auth flow; athlete, academic, health, event, note, workout, ranking, PR, meet-entry, and journal reads are now scoped by team/self at the route layer.

**Detail**: See [plan_current_April_02.md](plan_current_April_02.md) § Phase 1.1 for full feature list.

### 1.7.2 Track & Field UI pages (V1.1)
**Coach view**:
- [x] `app/track-and-field/workouts`: Create templates and log workouts for athletes (edit/delete still to do)
- [x] `app/track-and-field/rankings`: Display rankings + create ranking sources/entries
- [x] `app/track-and-field/meet-entries`: Manage meet rosters (structured entry MVP; CSV deferred)
- [x] `app/track-and-field/journals`: View athlete journals (coach MVP)

**Athlete view** (requires athlete login):
- [x] `app/athlete-portal/dashboard`: Personal workouts, PRs, rankings, assigned journals
- [x] `app/athlete-portal/journals`: Submit/view personal journals (coach + athlete only)
- [x] Athlete profile + PR summary visible to self

**Detail**: See [plan_current_April_02.md](plan_current_April_02.md) § Phase 1.2 for UI flow and athlete portal design.

### 1.7.3 Workout planned-vs-actual analytics (V1.2 → V2)
**Goal**: Overlay planned workout on actual results; compute deltas and performance classification; prepare for future graphs and projections.

**MVP**:
- [ ] Color-coded rep results (green/blue for excellent, neutral for on-plan, red for under-goal)
- [ ] Planned vs actual summary (e.g., planned 200m @ 26–27s → did 25–26s)

**Future (V2)**:
- [ ] Graphs: reps vs time (planned line + actual points)
- [ ] Linear regression projection of athlete performance trend
- [ ] Workout history analytics dashboard

**Detail**: See [plan_current_April_02.md](plan_current_April_02.md) § Phase 2 for analytics architecture.

---

## 1.8 Athlete Login & Portal (V1.1 → V1.2) — STARTED

### 1.8.1 Authentication & onboarding
- [x] Add `ATHLETE` role to `UserRole` enum in Prisma schema
- [x] `/app/login/page.tsx`: Shared login flow supports athlete accounts
- [x] NextAuth: Add `ATHLETE` role + session/token callback integration
- [x] Athlete user creation via seed

### 1.8.2 Athlete portal pages
- [x] `app/athlete-portal/layout.tsx`: Athlete-only navigation and guards
- [x] `app/athlete-portal/dashboard`: Personal workouts, PRs, rankings, journals
- [x] `app/athlete-portal/journals`: Submit personal journal + view coach feedback
- [x] Athlete data isolated from coach/AD overview (no cross-athlete visibility)

**Auth/Privacy**: Athlete users can only see their own data; journals visible only to coach + self.

**Detail**: See [plan_current_April_02.md](plan_current_April_02.md) § Phase 1.2 for athlete portal design.

---

## 2. V1.1: Stabilize + polish — IN PROGRESS

### 2.1 Role workflow
- [ ] AD team setup + coach invites
- [ ] CSV import (athletes + academic records)
- [x] Seed data tooling improved
- [x] Seed at least one athlete-linked login with track data

### 2.2 UX depth
- [ ] better modals/form flow
- [ ] detail pages (notes + history)
- [ ] chart panel (Recharts)
- [ ] advanced filters, CSV export

### 2.3 non-functional
- [x] route-level ACL hardening across core APIs
- [x] shared API error handling + Zod request parsing helpers
- [x] route-level tests for auth, ACL, validation, notes update, settings save, dashboard loading
- [ ] caching layers (React Query + edge)
- [ ] error tracking (Sentry)
- [ ] E2E tests (Playwright)

### 2.4 Current gaps after stabilization pass
- [ ] Replace `middleware.ts` with `proxy.ts` for Next.js 16 alignment
- [ ] Resolve Turbopack/NFT warning caused by Prisma client tracing
- [ ] Add richer edit/delete flows to Track & Field pages
- [ ] Add consistent toast/success/error UX across CRUD pages

---

## 3. V1.2: Workout analytics + prep for V2 — NOT STARTED

### 3.1 Workout performance visualization
- [ ] `lib/workoutAnalysis.ts`: Compute planned-vs-actual deltas, classify performance
- [ ] `lib/unitConversion.ts`: Sport-specific unit conversions (meters ↔ kilometers, yards, etc.)
- [ ] Charts with Recharts: reps vs time, planned overlay, historical trend
- [ ] Linear regression projection: predict future performance from workout history

### 3.2 External integrations stub + AI foundation
- [ ] `app/api/integrations/milesplit/sync/route.ts`: Placeholder for Milesplit ranking import
- [ ] `app/api/ai/assistant/route.ts`: Stub (AI chat moved to V2; see reasoning below)
- [ ] Snapshot tables: `athlete_snapshot`, performance summary caches

**Note**: AI assistant and external integrations (Milesplit, timing systems, race entry APIs) deferred to V2 to prioritize athlete portal and core workout analytics. Offline algorithmic projections (regression, trend line) start here instead of LLM-based.

**Detail**: See [plan_current_April_02.md](plan_current_April_02.md) § Phase 2 for analytics algorithms and optional feature roadmap.

---

## 4. V2: AI, integrations, multi-sport, and multi-org infrastructure — NOT STARTED

### 4.1 AI assistant module
- [ ] `app/api/assistant/query/route.ts`: LLM context builder and chat endpoint
- [ ] Compose context from athlete snapshots, academic/health/event data
- [ ] LLM wrapper (OpenAI/Anthropic) with rate limiting and permission checks
- [ ] Global assistant widget + page-specific contextual prompts
- [ ] "Smart insights": risk scoring, recommendations, summarization

### 4.2 External integrations
- [ ] Milesplit sync: import/refresh school + national rankings, athlete event rankings
- [ ] Timing system integrations (for meet result imports)
- [ ] Race entry APIs (search + sign-up flow for coaches)
- [ ] Integration scheduling + error handling

### 4.3 Multi-sport + multi-org infrastructure
- [ ] Schema expansion: `Institution`, `Season`, reusable `Sport` enum (track_field, football, soccer, etc.)
- [ ] Sport-specific data inheritance: Teams inherit sport metadata + unit conventions
- [ ] Generic workouts/journals/rankings patterns adaptable per sport
- [ ] Standardized sports plugin folder structure: `app/sports/track-and-field/`, `app/sports/football/`, etc.
- [ ] AD cross-sport dashboard + sport-scoped data views

### 4.4 Multi-tenant & scale
- [ ] Multi-team + multi-institution queries and filters
- [ ] Team switcher + ACL enforcement by institution/team
- [ ] Import queues + bulk operations

### 4.5 Performance infrastructure (if needed)
- [ ] Read replicas (Neon / Postgres)
- [ ] Connection pooling (pgbouncer)
- [ ] Metric monitoring (Prometheus/Grafana)

**Detail**: See [plan_current_April_02.md](plan_current_April_02.md) § Phase 3 for multi-sport architecture patterns and execution details.

---

## 5. Fast follow checkboxes

### Weekly check-ins
- [ ] What works
- [ ] What bottleneck exists
- [ ] Test coverage + critical path
- [ ] Deployment status on Vercel

### Current verification snapshot
- [x] `npm test -- --run`
- [x] `npm run lint`
- [x] `npm run build`
