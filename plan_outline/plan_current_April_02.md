## Plan: Unified Roadmap + Track & Field Expansion

TL;DR: Keep existing Roadmap structure (V1/V1.1/V1.2/V2) and append Track & Field + athlete portal + workout analytics scope now, with external integrations and AI in V2.

1. Review current source docs
- `plan_outline/development_roadmap.md` already has a strong base with V1 core, V1.1 stabilization, V1.2 assistant, V2 multi-team.
- `plan_outline/plan.md` and MVP planning doc show the same overall 3-phase v1 progression.
- Backend outline strongly confirms existing API and Prisma approach.

2. New requirements to add (explicit):
- Track & Field features: Workouts, Rankings, PRs, Meet entries, athlete journals (coach+athlete only), and full athlete login/viewing.
- Multi-sport sport-specific architecture built on generic templates.
- Workout data model: attached to sport/team; model JSON parameters optional customization; planned vs instance analytics and future graphs/projections.
- Unit conversion per sport (yards/meters/kilometers). store as metadata.
- For now, external integrations + AI in V2; realtime projections algorithm first if feasible.

3. Proposed roadmap outline (to be followed):

### Phase 0: Foundation and Loss Recovery
- Confirm existing base roadmap content is persisted in `development_roadmap.md`, `plan.md`, and high-level outlines. commit copy to `plan_outline/` as baseline.
- Add an Appendix section in `development_roadmap.md` for newly requested Track & Field requirements and athlete login.

### Phase 1: MVP Core (V1)
- Keep current V1 tasks: setup, auth/RBAC, CRUD APIs, overview, athletes, academics, health, schedule, notes.
- Finish any unchecked items in `development_roadmap.md` (RBAC wiring, lib/prisma export, etc.).
- Add `app/api/workouts/route.ts`, `app/api/track-rankings/route.ts`, `app/api/prs/route.ts`, `app/api/meet-entries/route.ts` and `app/api/journals/route.ts` as MVP stubs with coach/athlete auth.

### Phase 1.1: Track & Field Core Module
- Data models:
  - `Sport` (if not exists) and `Team.sport` values (e.g., track_field, soccer, etc.)
  - `WorkoutTemplate`, `WorkoutInstance`, `WorkoutMetric`, `WorkoutHistory`.
  - `RankingSource`, `EventRanking`, `PersonalRecord`, `MeetEntry`, `AthleteJournal`.
  - `MeasurementUnit` with conversion factors for `distanceUnit` and `timeUnit`.
- UI pages and flows:
  - Coach: `app/track-and-field/workouts` list + CRUD, `app/track-and-field/ratings`, `app/track-and-field/meet-entries`, `app/track-and-field/journals`
  - Athlete: `app/track-and-field/athlete-dashboard`, `app/track-and-field/journals` (coach+athlete only, private), PR summary, workouts (dictated by coach).
- Workouts features:
  - create workout templates with metrics (target pace, reps, distance)
  - save for reuse and select from menu
  - attach historical performance data
  - assign to athletes as plan
  - record actual `WorkoutInstance` results with per-rep results
  - compute plan-vs-actual delta, highlight green/blue/excellent.
- Rankings features:
  - integrate external source placeholder (milesplit data import type) with manual source for MVP.
  - show school/national rankings with athlete event rank + regional state.
- PRs features:
  - athlete PR table by event with timestamp and trend.
- Meet entries:
  - event 9id, athlete 9id, eventName, heat, lane
  - coach can import csv manually now; external search Integration future.
- Athlete journals:
  - coach & athlete create/read; privacy enforced via policies; non-other roles deny.

### Phase 1.2: Athlete login + athlete view
- Add `/app/auth/login/page.tsx` plus NextAuth role selection and gallery for athlete sign-in.
- Add `app/athlete-portal` route with:
  - personal dashboard (current workouts, PRs, rankings, journals, nutrition if present)
  - ability to view and submit journals.
- RBAC in `lib/rbac.ts` including `ATHLETE` role.
- Add expect to make athlete’s data separate from coach view in `app/overview`.

### Phase 2 (V1.2/V2): Analytics, AI, Integrations
- add graphs and projections for workout performance; start with custom math algorithms (no LLM dependency). can use `recharts` and maybe `d3`.
- prototypes:
  - reps x time chart
  - planned treadmill line vs actual
  - compute projected performance from trend (simple linear regression in backend `lib/workoutAnalysis.ts`)
- Add `app/api/ai/assistant/route.ts` stub and `app/api/integrations/milesplit/` planned.
- V2: external integrators (Milesplit, timing systems, race entry API), AI chatbot as second-phase.

### Phase 3 (V2+): Multi-team/multi-org + standard sports infra
- Schema: `Institution`, `Sport`, `Team`, `Season`, `Roster` etc.
- Techniques: adding `sport` field on each dataset, reusable core schema + sport extras.
- Standardize sports plugin pattern (example file structure: `app/sports/track-and-field/`, `app/sports/football/`).

4. File changes and feature mapping to keep track:
- `plan_outline/development_roadmap.md` update: add new sections and checkboxes for Track & Field.
- `app/api/*` new endpoints.
- `prisma/schema.prisma` new models for sport/tracking.
- `app/track-and-field/` new pages plus athlete portals.
- `lib/rbac.ts`, `lib/workoutAnalysis.ts`, `lib/unitConversion.ts`, `lib/teamSport.ts`.
- tests in `tests/` for workouts/rankings/prs/meet-entries/journals + athlete access.

5. Verification:
- manual flows for coach creating/uploading workout and assigning athlete; athlete logging workout and seeing color-coded metrics.
- unit tests for data model conversions; API auth and ACL.
- integration tests for athlete-only journal restrictions.

6. Decision points:
- Use first-class `sport` type vs string in Team; choose enumerated union in Prisma.
- Milesplit integration as optional import connector in V2; initially implement manual data entry and scheduled import stub.
- AI module in V2, but algorithmic projections can start in V1.2 by implementing map/reduce and linear regression locally.

---