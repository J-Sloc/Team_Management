## **1\. Scope and roles for v1**

V1 target: One institution, one sport, one team, with two roles (Athletic Director and Head Coach). Athletes can be added as data, but no separate athlete login yet.​

* Roles:  
  * Athletic Director (AD): Full read access to the team, can configure thresholds and see all insights.​  
  * Head Coach: Full read/write access for their team’s data (calendar, athletes, notes, etc.).​  
* Core domains in v1:  
  * Team overview (landing)  
  * Athlete hub (roster \+ per-athlete detail)  
  * Academics & eligibility  
  * Health & availability (simplified Medical \+ Compliance)  
  * Schedule (calendar)  
  * AI assistant (scoped to these domains)​

Future versions can add: athlete login, multi-team support, recruiting, nutrition, S\&C, etc., without changing v1’s mental model.

---

## **2\. V1 feature set by page**

## **2.1 Authentication and onboarding**

* Sign up / sign in:  
  * Email \+ password.  
  * Choose role: AD or Coach (for v1, created manually or via admin seed).​  
* Basic team setup:  
  * AD can define: team name, sport, season year, and invite coaches.  
  * CSV import for Athlete and Academic datasets (simple schema aligned with your Clean\_\* tables).​

## **2.2 Overview (role-specific home)**

* AD Overview:  
  * KPI cards: average team GPA, number of ineligible athletes, athletes not medically cleared, remaining years of eligibility distribution.​  
  * Top insights list: 3–5 AI-generated summaries (e.g., “4 athletes are at risk academically this term; 2 have low attendance and GPA \< 2.5”).​  
  * Mini calendar widget: next 5 events.​  
* Coach Overview:  
  * Similar KPIs, but focused on their team only.  
  * “Action queue”: short list of tasks (e.g., “Review medical status for 3 athletes,” “Check progress of 2 at-risk students”).​

Future: Athlete Overview page for logged-in athletes, multi-team overview for AD.

## **2.3 Team → Athlete hub**

* Roster table:  
  * Columns: Athlete ID, Name, Position(s), Class Year, GPA, Academic Standing, Medical status, Eligibility status, Key risk flag.​  
  * Filters: position, classification, academic standing, medical clearance, risk flag.  
* Athlete detail page:  
  * Header: photo placeholder, basic info (height, weight, jersey, major, GPA, class year).​  
  * Sections:  
    * Snapshot: current academic standing, medical clearance, years of eligibility left, NIL / transfer probability fields if present.​  
    * Recent events: last 5 key calendar events and any notes.  
  * Actions: edit athlete, add note, view full history.  
* Contextual AI panel:  
  * Pre-filled prompts like “Summarize this athlete’s academic and health status” and “Highlight any risks I should know before next game.”​

Future: dedicated tabs for medical detail, strength metrics, nutrition logs, recruiting profile on each athlete.

## **2.4 Performance → Academics & eligibility**

* Academic table view:  
  * Columns: Athlete ID, Name, Major, GPA, Academic Standing, semester, compliance status, final assessment score, attendance, tutoring hours.​  
  * Primary filters (visible by default): semester, academic standing, compliance status.  
  * Advanced filters (in collapsible panel): GPA ranges, attendance %, tutoring hours, final score ranges.​  
* Charts:  
  * One main histogram: distribution of final assessment scores, colored by compliance status.​  
  * Optional bar of GPA by major.  
* Actions:  
  * Edit academic record (for coach/AD).  
  * Add academic advisor note.​  
* AI panel:  
  * Pre-prompts like:  
    * “Which athletes are at highest risk of academic ineligibility this term and why?”  
    * “Summarize academic trends by position.”​

Future: integrate tutoring schedules, more granular course-level analytics, per-advisor dashboards.

## **2.5 Health & availability (simplified Medical \+ Compliance)**

* Table:  
  * Columns: Athlete ID, Name, latest injury description, injury date, rehab sessions, appointment attendance %, medical clearance status, NCAA compliance status.​  
* Filters:  
  * Medical status (cleared, not cleared, in rehab).  
  * Compliance status (compliant, warning, non-compliant).​  
* AI insights:  
  * Suggested prompt: “Of the injured athletes, who are most likely to return soonest?” mirroring your prototype example.​  
  * Output: AI explanation referencing appointment attendance, rehab sessions, and injury recency.​

Future: detailed injury history, S\&C integration, workload recommendations.

## **2.6 Schedule → Calendar**

* Calendar views:  
  * Month, week, and agenda view using a standard calendar library.​  
* Event types:  
  * Game, practice, meeting, medical appointment, recruiting visit, academic deadline, etc.  
* Role-based permissions:  
  * Coach: can create/edit/delete team events.  
  * AD: can create/edit/delete team events and program-wide events.  
  * (Future) Athlete: can add personal events only.​  
* Event detail pane:  
  * Fields inspired by your prototype: opponent, event type, location, start/end time, notes.​

Future: multi-team calendars, conflict detection (e.g., exam vs practice).

## **2.7 AI assistant**

* One back-end “Team Management assistant” modeled on your Foundry agent: GPT-based, with tools to query:  
  * Athlete snapshot,  
  * Academic records,  
  * Health & compliance summary,  
  * Schedule events.​  
* Contextual deployments:  
  * Global assistant (accessible from header) for general questions about the team.  
  * Page-specific assistant, pre-seeded with the current filter context or selected athlete.​  
* Behaviors:  
  * Q\&A: answer descriptive and analytical questions.  
  * Recommendation mode: “Recommend actions for this week based on academic risks and upcoming schedule.”

Future: AI-driven edit flows (“propose, then apply changes”), long-lived conversation histories, cross-team comparisons.

---

## **3\. Data model and APIs (v1, but future-proofed)**

## **3.1 Core tables (simplified)**

* users: id, email, role (AD/Coach), team\_id.  
* teams: id, name, sport, institution.  
* athletes: id, team\_id, name, positions, jersey\_number, height, weight, class\_year, major, gpa, academic\_standing, eligibility\_years\_left, scholarship\_status, contact\_info, transfer\_probability, etc.​  
* academic\_records: id, athlete\_id, semester, final\_score, gpa\_term, compliance\_status, attendance, tutoring\_hours, advisor\_notes.​  
* health\_records: id, athlete\_id, injury\_type, injury\_date, status, rehab\_sessions, appointment\_attendance, notes.​  
* compliance\_records: id, athlete\_id, status, notes, last\_reviewed\_at.​  
* events: id, team\_id, type, title, description, start\_time, end\_time, location, opponent, group (team/personal), created\_by\_user\_id.​  
* notes: id, athlete\_id (nullable), user\_id, category (academic/medical/general), body, created\_at.

## **3.2 Snapshot views**

To keep queries fast and AI simple:

* athlete\_snapshot (materialized or denormalized view):  
  * One row per athlete combining key fields: latest academic standing, latest health status, eligibility, risk flags.​

AI and overview pages use athlete\_snapshot for quick answers, then drill into underlying tables as needed.

## **3.3 API patterns**

* REST-ish endpoints:  
  * GET /api/athletes, GET /api/athletes/:id  
  * GET /api/academic-records, GET /api/health-records  
  * GET /api/events  
* Filtering via query params (shared pattern):  
  * /api/academics?semester=Fall%202024\&standing=Bad  
  * /api/athletes?position=WR\&risk=high  
* AI gateway:  
  * POST /api/assistant/query with body:  
    * question, contextType (global/athlete/academics/health), contextFilters, athleteId?  
  * Backend:  
    * Fetch context from DB.  
    * Call LLM with structured context \+ instructions similar to your Foundry agent prompt.​

Future: GraphQL or more sophisticated query layer if needed, but this is sufficient for v1.

---

## **4\. UX and visual design principles baked into v1**

* Navigation:  
  * Top-level: Overview, Team, Performance, Health & Eligibility, Schedule, Assistant.  
* Consistent layout:  
  * KPIs at top, main table/visual center, AI and filters on side or under a clear toggle.​  
* Progressive disclosure:  
  * Keep advanced filters and secondary charts behind accordions.​  
* Color and hierarchy:  
  * Neutral base UI, strong colors only for statuses (risk, eligibility, clearance, compliance).

This lets you expand to more domains (Nutrition, S\&C, Recruiting) by “plugging in” new pages that reuse the same table \+ filter \+ AI pattern.

---

## **5\. Future versions (sketched, not built yet)**

With this v1 structure, you can incrementally add:

* V1.1:  
  * Athlete login and Athlete Overview page.  
  * Nutrition page (uses same table and filters pattern).  
* V1.2:  
  * S\&C performance dashboard.  
  * Recruiting module (recruiting\_information and professional\_sports\_\* datasets).​  
* V2:  
  * Multi-team and multi-sport support for AD.  
  * Cross-team benchmarking in AI (e.g., compare academics or injury rates across teams).

