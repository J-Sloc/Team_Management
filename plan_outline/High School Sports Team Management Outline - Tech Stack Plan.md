## **Frontend**

* Framework: React with TypeScript  
* App framework: Next.js (app router)  
  * Benefits: built-in routing, API routes (for thin backend endpoints if needed), good auth patterns, great DX.  
* UI layer:  
  * Component library: MUI or Chakra UI for fast layout of tables, cards, modals.  
  * Charts: Recharts or Chart.js for the histograms and KPI charts.  
  * State/query: React Query (TanStack Query) for data fetching and caching.  
* Auth:  
  * NextAuth.js (or built-in Next.js Auth) with email/password provider.

This combo makes it straightforward to build the dashboard UI, tables, filters, and reuse patterns you’ve scoped.

---

## **Backend**

You have two good options:

* Option 1 (simple v1): use Next.js API routes as your backend  
* Option 2 (more separation): separate API service (e.g., Node \+ NestJS or FastAPI in Python)

Given your MVP, I’d start with Next.js API routes and keep the architecture clean so you can split out later if needed.

Core backend pieces (regardless of where they run):

* Language: TypeScript  
* DB: PostgreSQL  
* ORM: Prisma (schema-first, great for TypeScript, migrations, and prototyping)  
* Auth storage: users table in Postgres.  
* AI integration:  
  * A small “assistant service” inside the backend that:  
    * Receives question \+ context.  
    * Runs DB queries (via Prisma) to build context objects.  
    * Calls the LLM (e.g., OpenAI / Anthropic) with a structured prompt.

---

## **Infrastructure & tooling**

* Hosting: Vercel or similar for the Next.js app.  
* Database: Managed Postgres (Supabase, Neon, RDS, etc.).  
* Migrations: Prisma migrations.  
* Env/config: .env for secrets, with different configs for dev/prod.  
* Testing:  
  * Light unit tests on core backend logic (especially AI context building functions).  
  * Cypress/Playwright later for critical user flows.

---

## **Data model (v1, recap in technical terms)**

Core tables in Prisma/SQL terms:

* User: id, email, password\_hash, role (AD/COACH), teamId  
* Team: id, name, sport, institution  
* Athlete: id, teamId, name, positions, jerseyNumber, height, weight, classYear, major, gpa, academicStanding, eligibilityYearsLeft, scholarshipStatus, contactInfo, transferProbability, medicalStatus, complianceStatus, riskFlag  
* AcademicRecord: id, athleteId, semester, finalScore, termGpa, academicStanding, complianceStatus, attendancePercent, tutoringHours, advisorNotes  
* HealthRecord: id, athleteId, injuryType, injuryDate, status, rehabSessions, appointmentAttendancePercent, notes  
* Event: id, teamId, type, title, description, startTime, endTime, location, opponent, group, createdByUserId  
* Note: id, athleteId (nullable), userId, category, body, createdAt

Plus a view or materialized table:

* AthleteSnapshot: athleteId, joined/denormalized data from latest AcademicRecord, latest HealthRecord, plus key flags.

---

## **API design**

REST-ish endpoints with consistent patterns:

* Auth:  
  * POST /api/auth/signup  
  * POST /api/auth/signin  
  * POST /api/auth/signout  
* Team/roster:  
  * GET /api/athletes  
  * GET /api/athletes/:id  
  * POST /api/athletes  
  * PATCH /api/athletes/:id  
* Academics:  
  * GET /api/academic-records  
  * PATCH /api/academic-records/:id  
* Health:  
  * GET /api/health-records  
* Events:  
  * GET /api/events  
  * POST /api/events  
  * PATCH /api/events/:id  
* Notes:  
  * POST /api/notes  
  * GET /api/notes?athleteId=...  
* AI:  
  * POST /api/assistant/query

Filtering via query params, e.g.:

* /api/academic-records?semester=Spring%202025\&standing=Bad\&minGpa=2.0  
* /api/athletes?position=WR\&riskFlag=HIGH

---

## **Implementation breakdown (suggested sprints)**

Assume 1–2 week sprints. You can compress/expand based on your time.

## **Sprint 1 – Foundations: repo, auth, basic layout**

* Set up Next.js (TypeScript) project.  
* Install Prisma, connect to Postgres, define initial schema for User, Team, Athlete.  
* Implement email/password auth with role (AD/Coach).  
* Create the global layout:  
  * Top nav.  
  * Left sidebar nav.  
* Stub pages for:  
  * Overview  
  * Team  
  * Performance  
  * Health & Eligibility  
  * Schedule

Goal: You can sign up, sign in, and see empty version of all main pages with navigation working.

---

## **Sprint 2 – Data model \+ roster UI**

* Extend Prisma schema with:  
  * AcademicRecord  
  * HealthRecord  
  * Event  
  * Note  
* Build CRUD for Athletes:  
  * GET /api/athletes, GET /api/athletes/:id, POST, PATCH.  
* Implement Team → Roster page:  
  * Table with pagination and basic filters (position, class year).  
  * “Add athlete” modal tied to POST /api/athletes.  
* Implement Athlete detail page:  
  * Fetch by ID, show snapshot, notes list (read-only).  
* Add creation of notes (POST /api/notes) and display them on Athlete page.

Goal: Roster and athlete detail are actually backed by DB and editable.

---

## **Sprint 3 – Academics & Eligibility**

* Implement AcademicRecord endpoints (GET, PATCH).  
* Build Academics page:  
  * Filters (semester, academic standing, compliance status).  
  * Table with columns defined in UX.  
  * Advanced filters panel (you can start by wiring just GPA/filter; expand later).  
* Add at least one chart:  
  * GPA or final score distribution using Recharts/Chart.js.  
* Create a denormalized AthleteSnapshot (either as:  
  * a Prisma view,  
  * or computed per query in code at first).

Goal: Academics page works end-to-end with filters and a basic chart.

---

## **Sprint 4 – Health & Schedule**

* Implement HealthRecord endpoints (GET).  
* Build Health & Availability page:  
  * Filters by medical status.  
  * Table with injury info and rehab metrics.  
* Implement Events endpoints (GET/POST/PATCH).  
* Integrate a calendar component:  
  * Month and Week views.  
  * Event creation/edit modal for coaches/AD.  
* Add basic event list in Agenda view.

Goal: Health and Schedule pages work, with event CRUD for team events.

---

## **Sprint 5 – AI assistant (v1)**

* Create /api/assistant/query endpoint.  
* Implement helper functions to:  
  * Given a context (global, athlete, academics, health) and filters, fetch relevant rows (mainly from AthleteSnapshot, AcademicRecord, HealthRecord, and Events).  
  * Build a structured prompt:  
    * System message (role, constraints).  
    * Context JSON (summarized, not raw tables).  
    * User question.  
* Integrate UI:  
  * Global assistant drawer.  
  * Contextual panel on Athlete and Academics pages (call the same endpoint with extra context type/IDs).  
* Start with read-only AI (no actions), focusing on summaries and lists.

Goal: You can ask: “Which athletes are at highest academic risk?” or “Of the injured athletes, who is likely to return soonest?” and get coherent answers based on your DB.

---

## **Sprint 6 – Polish, permissions, and UX refinement**

* Role-based permissions:  
  * Middleware/guards so only AD/Coach of this team can access/edit.  
* Refine filters and advanced options on Academics and Health.  
* Improve table UX:  
  * Save and share common filter presets (optional).  
  * Better empty states and error handling.  
* Visual/UX polish:  
  * Consistent card styles, spacing, typography.  
  * Tighten copy using the text we drafted.

Goal: A cohesive, stable v1 that feels like a real product, not a prototype.

