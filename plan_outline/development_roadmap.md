# Development Roadmap (V1 → V2)

## 1. V1: Core MVP (goal 4–6 weeks)

### 1.1 Setup & base plumbing (day 1)
- [ ] Confirm Next.js + TypeScript project compiles
- [ ] Fix alias paths (`@/lib/prisma` etc)
- [ ] Run `npx prisma migrate dev` / `npx prisma generate`
- [ ] NextAuth + credentials auth / role field in User model
- [ ] Seed users: AD + Coach (hard-coded or `prisma/seed.ts`)

### 1.2 Data model + DB CRUD (days 2–5)
- [ ] `prisma/schema.prisma`:
  - User, Team, Athlete, AcademicRecord, HealthRecord, Event, Note
- [ ] API routes:
  - `app/api/athletes/route.ts` (GET, POST, PATCH, DELETE)
  - `app/api/academic-records/route.ts`
  - `app/api/health-records/route.ts`
  - `app/api/events/route.ts`
  - `app/api/notes/route.ts`
- [ ] `lib/prisma.ts` client export
- [ ] `app/lib/auth.ts` NextAuth + JWT session token

### 1.3 Auth + RBAC wiring (day 5)
- [ ] `role` in session + token callback
- [ ] AD/Coach guard for routes
- [ ] Server-side check in `app/overview` and `app/athletes`

### 1.4 UI pages v1 (days 6–12)
- `app/page.tsx` -> redirect to `/overview` for logged-in users
- `app/overview/page.tsx`:
  - KPI cards (avg GPA, ineligible, med clearance, eligibility)
  - “Athletes requiring attention” list
  - Recent 5 events
- `app/athletes/page.tsx`:
  - Roster table (API-backed)
  - Add / edit / delete flow
  - Filters: position, class, standing, medical status, risk
- `app/athletes/[id]/page.tsx` (athlete profile skeleton)
- `app/performance/page.tsx` (Academic records table + filter)
- `app/health/page.tsx` (Medical records table + filter)
- `app/schedule/page.tsx` (calendar integration step)

### 1.5 Business logic (days 10–14)
- [ ] Eligibility rules (GPA thresholds)
- [ ] Risk flag computation with query fields
- [ ] Medical compliance status
- [ ] At-risk dataset for the AD/Coach queue

### 1.6 UI finishing + QA (days 13–18)
- [ ] Use React Query (TanStack Query)
- [ ] Add toast/error handling
- [ ] Add validation via Zod
- [ ] Add basic tests for API routes

---

## 2. V1.1: Stabilize + polish

### 2.1 Role workflow
- [ ] AD team setup + coach invites
- [ ] CSV import (athletes + academic records)
- [ ] Seed data tooling improved

### 2.2 UX depth
- [ ] better modals/form flow
- [ ] detail pages (notes + history)
- [ ] chart panel (Recharts)
- [ ] advanced filters, CSV export

### 2.3 non-functional
- [ ] caching layers (React Query + edge)
- [ ] error tracking (Sentry)
- [ ] E2E tests (Playwright)

---

## 3. V1.2: AI assistant + offline snapshots

### 3.1 assistant API
- [ ] `app/api/assistant/query/route.ts`
- [ ] compose context payload from DB snapshot tables:
  - athlete_snapshot
  - latest academic + health + event summary
- [ ] LLM call wrapper (OpenAI/Anthropic)
- [ ] rate-limit and permission check

### 3.2 UI
- [ ] global assistant widget
- [ ] page-specific panel with context and canned prompts

### 3.3 “smart insights”
- [ ] risk scoring
- [ ] automated recommendations list
- [ ] summarization endpoint

---

## 4. V2: multi-team + multi-org (strategy)

### 4.1 db expansion
- [ ] institution table
- [ ] team scope + ownership details
- [ ] multi-tenant filters
- [ ] indexes on `teamId`, `institutionId`, `status`

### 4.2 product
- [ ] AD cross-team dashboard
- [ ] team switcher + ACL enforcement
- [ ] import queues + bulk operations

### 4.3 scale
- [ ] read replicas (Neon / Postgres)
- [ ] connection pool (pgbouncer)
- [ ] metric monitoring (Prometheus/Grafana)

---

## 5. Fast follow checkboxes

### Weekly check-ins
- [ ] What works
- [ ] What bottleneck exists
- [ ] Test coverage + critical path
- [ ] Deployment status on Vercel