# Next Phase Plan: V1 MVP Foundation → UI Pages

## TL;DR: 3 Phases Over ~2 Weeks
**Phase 1 (2 days)**: Enable testing — seed data + RBAC middleware
**Phase 2 (4 days)**: Complete API layer — finish 4 remaining CRUD endpoints  
**Phase 3 (4 days)**: Build pages + business logic — overview, performance, health, schedule + eligibility rules

This unblocks the Overview page (core feature) and establishes patterns for remaining pages.

---

## Phase 1: Seed Data + RBAC (2 days)

**Goal**: Enable local testing with realistic data; enforce role-based access.

### Steps
1. Implement `prisma/seed.ts`
   - Create test users: 1 AD (admin), 1 Coach
   - Create 1 Team ("Football Team")
   - Seed 10 Athletes with varied academic/health statuses + risk flags
   - Run: `npm run db:seed` after migrations

2. Build RBAC middleware in `lib/rbac.ts`
   - Helper: `requireRole(session, ...roles)` -> 401 if unauthorized
   - Helper: `requireSession()` -> redirect to login
   - Use in API routes with guard at start of route handler

3. Protect `/api/athletes` with role check
   - POST/PUT/DELETE: COACH | AD only
   - GET: COACH | AD only  
   - Error responses: 401 Unauthorized with message

4. Add role guard to `/athletes` page
   - Check session in component/layout
   - Render 403 page if unauthorized

**Files to modify/create**:
- `prisma/seed.ts` (new)
- `lib/rbac.ts` (new)
- `app/api/athletes/route.ts` (update with guards)
- `app/athletes/page.tsx` or `layout.tsx` (add guard)

**Verification**: 
- `npm run db:seed` runs without errors
- Seed data appears in Prisma Studio
- Unauthorized requests return 401
- Logged-out user redirected from `/athletes`

---

## Phase 2: Complete API Layer (4 days)

**Goal**: Build remaining CRUD endpoints so pages can fetch data.

### Steps

1. Build `/api/academic-records` route (1 day)
   - GET: fetch by athleteId, semester, standing filters
   - POST: create record
   - PUT: update (requires same athleteId guard)
   - DELETE: remove record
   - Validation: athleteId exists, semester required
   - *Parallel with step 2*

2. Build `/api/health-records` route (1 day)
   - GET: fetch by athleteId, medical status, compliance filters
   - POST: create record
   - PUT: update
   - DELETE: remove
   - Validation: athleteId exists, injuryType optional
   - *Parallel with step 1*

3. Build `/api/events` route (1 day)
   - GET: fetch by teamId, date range, event type filters
   - POST: create (requires "COACH| AD" role)
   - PUT: update
   - DELETE: remove
   - Index: (teamId, startTime) for performance
   - *Parallel with step 4*

4. Build `/api/notes` route (1 day)
   - GET: fetch by athleteId (nullable), category filters
   - POST: create with userId from session
   - DELETE: remove
   - Shorter than others, can absorb in parallel
   - *Parallel with step 3*

**All routes**: Add role guard, proper error handling (400/401/404), return 201 on create.

**Files to modify/create**:
- `app/api/academic-records/route.ts` (new)
- `app/api/health-records/route.ts` (new)
- `app/api/events/route.ts` (new)
- `app/api/notes/route.ts` (new)

**Verification**:
- Each endpoint tested via curl or Postman
- Filters work (e.g., `/api/academic-records?athleteId=x&semester=Fall%202024`)
- Unauthorized requests blocked
- Invalid payloads return 400

---

## Phase 3: Overview Page + Business Logic (4 days)

**Goal**: Deliver core visibility page (Overview); establish patterns for other pages.

### Steps

1. Implement business logic layer (1.5 days)
   - Create `lib/eligibility.ts`:
     - `computeEligibility(athlete, academicRecords)` → { isEligible, reason, riskLevel }
     - GPA threshold: < 2.0 = ineligible, 2.0-2.5 = at risk, >= 2.5 = clear
   - Create `lib/medicalStatus.ts`:
     - `computeMedicalClearance(healthRecords)` → clearanceStatus
     - Not cleared if recent injury and appointment attendance < 80%
   - Create `lib/dashboardData.ts`:
     - `getTeamMetrics(teamId)` → { avgGPA, ineligibleCount, notClearedCount, riskFlags: [] }
     - Aggregates from Athlete + AcademicRecord + HealthRecord tables
   - *Can start before API routes done; use mock fixtures*

2. Build `/app/overview/page.tsx` (1.5 days)
   - Server component (fetch from APIs in stage 2)
   - KPI cards: avg GPA, # ineligible, # not medically cleared, eligibility distribution
   - "Athletes Requiring Attention" table: top 5 by risk (limit output)
   - "Recent Events" list: next 5 upcoming (from events table)
   - Use `lib/dashboardData.ts` and business logic
   - Layout: grid KPIs, two columns below (alert table + events)
   - Role check: COACH | AD only
   - *Depends on: academic-records, health-records, events APIs*

3. Create `/app/overview/layout.tsx` (0.5 days)
   - Shared layout for future sub-pages
   - Breadcrumb for navigation

4. Build filters/drill-down for Overview (if time)
   - Filter athletes by class year, position (optional for first pass)

**Files to create**:
- `lib/eligibility.ts`
- `lib/medicalStatus.ts`
- `lib/dashboardData.ts`
- `app/overview/page.tsx`
- `app/overview/layout.tsx`

**Verification**:
- Overview page loads for authenticated COACH/AD
- KPI numbers match raw DB counts
- "At Risk" athletes visible if seeded with risk flags
- Unauthenticated user redirected to `/login`
- Next 5 events displayed in order

---

## Implementation Order (Dependencies)

```
Phase 1 (Days 1-2)
  ├─ seed.ts
  │  └─ Enables Phase 3 testing
  └─ RBAC middleware
     └─ Protects all subsequent routes/pages

Phase 2 (Days 3-6) [Parallel: academic + health in days 3-4; events + notes in days 5-6]
  ├─ academic-records API
  ├─ health-records API
  ├─ events API
  └─ notes API
     └─ Unblock Phase 3 data fetching

Phase 3 (Days 7-10) [Can start business logic in parallel with Phase 2]
  ├─ eligibility.ts + medicalStatus.ts (early, uses seed data)
  ├─ dashboardData.ts
  ├─ overview/page.tsx (depends on: academic, health, events APIs)
  └─ overview/layout.tsx
```

**Critical path**: Seed → RBAC → Academic/Health/Events/Notes APIs → Overview Page (10 days total if serial, ~6-7 if parallelized correctly).

---

## Relevant Files & Patterns

### RBAC Pattern (from athletes route):
- Use `const session = await auth()` in server components
- In API routes: `if (!session?.user?.role || !['COACH', 'AD'].includes(session.user.role)) return NextResponse.json({error: 'Unauthorized'}, {status: 401})`

### CRUD API Pattern (reference: `app/api/athletes/route.ts`):
- GET with optional `teamId` filter
- POST with validation and 201 response
- PUT with id from query param + partial data
- DELETE with id check

### Database Indexing (already in schema):
- Athletes: `@@index([teamId])`
- AcademicRecord: `@@index([athleteId]), @@index([semester, academicStanding])` ← use for bulk queries
- HealthRecord: `@@index([athleteId])`
- Events: `@@index([teamId, startTime])` ← use for date range queries

---

## Decisions & Scope

**Included**:
- Seed only one team + users (multi-tenant in V2)
- Business logic tier (eligibility, medical, dashboard) — enables future reuse in assistant
- Overview page as single entry point (role-agnostic layout for now)

**Excluded**:
- React Query (add in Phase 4 for caching/sync)
- Zod validation (add in Phase 4 for form safety)
- AI assistant (Phase 3 in roadmap)
- CSV import (Phase 1.1 in roadmap)
- Athlete detail page (tackled after overview patterns solidify)

**Assumptions**:
- Testing done locally via curl/Postman or Insomnia (no Playwright yet)
- Database is live and migrations are runnable (`npm run db:migrate` works)
- Tailwind is configured correctly (no CSS fixes needed)
