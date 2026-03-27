## **1\. Auth & first-time setup**

## **1.1 Sign-in / Sign-up**

* Layout:  
  * Centered card on a neutral background.  
  * App logo/title at top, short subtitle (“Integrated team management for coaches and ADs”).  
* Elements:  
  * Email input.  
  * Password input.  
  * Primary button: “Sign in”.  
  * Text link: “Create an account”.  
  * Secondary link: “Forgot password?”  
* Sign-up version:  
  * Name.  
  * Email.  
  * Password \+ confirm.  
  * Role selector (radio buttons or dropdown): Athletic Director or Head Coach.​  
  * Team selector or “Create team” depending on role (for v1, you can keep this simple: AD creates team; Coach enters invite code).

---

## **2\. Overview (AD and Coach views)**

## **2.1 Layout skeleton (both roles)**

* Global shell:  
  * Top nav bar: app logo, current team name, role label (AD/Coach), profile menu, global AI assistant icon.  
  * Left sidebar (persistent): main nav items  
    * Overview  
    * Team  
    * Performance  
    * Health & Eligibility  
    * Schedule  
    * (Assistant can be a floating button instead of nav item)  
* Main content (card-based layout):  
  * Row 1: key KPI cards.  
  * Row 2: primary insight or “At-risk athletes” list.  
  * Row 3: secondary widgets (mini calendar, notifications, recent AI suggestions).

## **2.2 AD Overview**

* Row 1 – KPI cards (4 cards in a grid):  
  * “Average Team GPA”  
  * “Ineligible Athletes”  
  * “Not Medically Cleared”  
  * “Years of Eligibility Remaining (avg or distribution)”  
  * Each card: big number, small label, subtle trend indicator.  
* Row 2 – Key risks list:  
  * Title: “Athletes Requiring Attention”.  
  * Table/list with: Athlete name, reason (e.g., “GPA \< 2.3”, “Non-compliant”, “Injury”), quick action (“View athlete”).  
* Row 3 – Split layout:  
  * Left: mini calendar (next 5 events list, e.g., upcoming game, exam week, major practice).  
  * Right: “Latest AI insights” card with 3–5 bullet summaries and a “Ask a follow-up” button.

## **2.3 Coach Overview**

* Very similar layout, but content scoped to their team and with more operational tone:  
  * KPI cards: “Avg Team GPA,” “Eligible for next game,” “Cleared to Play,” “Upcoming Games”.  
  * Middle: “Today’s Priorities” (tasks list: review injuries, confirm starters, check academic warnings).  
  * Bottom: same mini calendar \+ AI insights, but phrased as “Coaching suggestions” (e.g., “Consider lighter practice for these 3 athletes”).

---

## **3\. Team → Athlete hub**

## **3.1 Athlete list (roster)**

* Layout:  
  * Header: “Team Roster” with filter \+ “Add athlete” button on the right.  
  * Below: filter bar.  
  * Main: full-width data table.  
* Filter bar:  
  * Dropdowns: Position, Class Year, Academic Standing, Medical Status, Risk Flag.  
  * Search box: “Search by name or ID”.  
* Table columns:  
  * Checkbox (for future bulk actions).  
  * Athlete Name (with small subtext: ID).  
  * Position(s).  
  * Class year.  
  * GPA.  
  * Academic standing.  
  * Medical status (icon \+ text).  
  * Eligibility status (e.g., “Eligible”, “At risk”).  
  * Rightmost: “View” action button.  
* Interaction:  
  * Row click or “View” opens the Athlete detail page in same shell.

## **3.2 Athlete detail**

* Layout:  
  * Two-column split on desktop, stacked on mobile.  
* Top header:  
  * Left: name, jersey number, position(s), class year.  
  * Right: small label chips for statuses (Academic Good/Bad, Medically Cleared/Not, Compliance).  
* Left column:  
  * Snapshot card:  
    * GPA, academic standing.  
    * Eligibility years left.  
    * Medical status.  
    * Compliance status.  
  * Recent events list:  
    * Last 3–5 schedule items involving this athlete (games, appointments).  
  * Notes:  
    * Simple list of notes \+ “Add note” button.  
* Right column:  
  * AI panel (sticky card):  
    * Title: “Ask about this athlete”.  
    * Pre-suggested prompts:  
      * “Summarize current academic and health status.”  
      * “What are the main risks for this athlete?”  
    * Input box and response area.

Future: add tabs across top (“Overview | Academics | Health | S\&C | Recruiting”).

---

## **4\. Performance → Academics & Eligibility**

## **4.1 Academics page layout**

* Header:  
  * Title: “Academics & Eligibility”.  
  * Right side: main semester selector \+ “Export” button (CSV/PDF later).  
* Top strip:  
  * 2–3 KPI cards aligned horizontally:  
    * “Avg GPA (selected filters)”  
    * “Compliant / Non-compliant counts”  
    * “Athletes with GPA \< X”  
* Middle: 2-column layout  
  * Left: filters \+ table.  
  * Right: main chart \+ AI panel (on large screens); on small screens, stack.

## **4.2 Filters**

* “Primary filters” block (inline row above table):  
  * Dropdown: Semester.  
  * Dropdown: Academic Standing (Good / Neutral / Bad).  
  * Dropdown: Compliance Status.  
* “Advanced filters” panel:  
  * Collapsible card labeled “Advanced filters”.  
  * Inside: sliders or numeric inputs for:  
    * GPA range.  
    * Attendance %.  
    * Tutoring hours.  
    * Final assessment score.  
  * Apply / Clear buttons.

## **4.3 Academic table**

* Columns:  
  * Athlete Name (ID as subtext).  
  * Major.  
  * GPA.  
  * Academic Standing.  
  * Semester.  
  * Compliance Status.  
  * Final Assessment Score.  
  * Attendance %.  
  * Tutoring hours.  
  * Advisor notes (truncated, with tooltip or “view”).  
* Row actions:  
  * Rightmost: “Edit” button.  
* Above table:  
  * Small row of filter chips showing active filters (e.g., “Semester: Spring 2025”, “GPA \< 2.5”) with X to remove.

## **4.4 Chart \+ AI on right**

* Chart:  
  * Single main visualization: histogram of final scores or GPA distribution.  
  * Legend for compliance status color coding.  
* AI panel:  
  * Title: “Ask about academic performance”.  
  * Pre-suggested prompts:  
    * “Which athletes are most at risk academically?”  
    * “What trends do you see by major or class year?”  
  * Input and response box.

---

## **5\. Health & Eligibility page**

## **5.1 Layout**

* Very similar structure to Academics for consistency.  
* Header:  
  * Title: “Health & Availability”.  
  * Toggle chip group to focus view:  
    * “All”, “Injured”, “Not Medically Cleared”.  
* Top KPIs:  
  * “Athletes not medically cleared”.  
  * “Injuries this season”.  
  * “Avg rehab appointment attendance %”.

## **5.2 Filters \+ table**

* Primary filters:  
  * Injury status (e.g., Healthy, In Rehab, Out).  
  * Compliance status.  
* Table columns:  
  * Athlete Name.  
  * Injury type (latest).  
  * Injury date.  
  * Rehab sessions count.  
  * Appointment attendance %.  
  * Medical status (e.g., Cleared / Not Cleared).  
  * Compliance status.  
  * Notes.  
* Row action: “View athlete” (deep link to athlete detail).

## **5.3 AI panel and “return timeline” insight**

* AI panel:  
  * Pre-suggested prompt:  
    * “Of the injured athletes, who are most likely to return soonest?” (your prototype example).​  
    * “Which injuries are most concerning based on rehab engagement?”  
* Response area:  
  * Use simple bullet list (“1. Athlete – reason”).

---

## **6\. Schedule → Calendar**

## **6.1 Calendar page layout**

* Header:  
  * Title: “Schedule”.  
  * Right side controls:  
    * View switcher: Month / Week / Agenda.  
    * “Add event” primary button.  
* Main:  
  * Calendar component occupying most of the page.

## **6.2 Calendar interactions**

* Month view:  
  * Standard grid by week.  
  * Each day shows up to 2–3 events with color-coded tags (Game, Practice, Meeting, Academic, Medical).  
  * “+ more” expansion for days with many events.  
* Week/Agenda view:  
  * Time-based layout for the week, or a list sorted by date/time.  
* Clicking an event:  
  * Opens a side drawer or modal:  
    * Title, type, opponent (if game), location, start/end time.  
    * Description.  
    * Checkboxes for “Team event?” vs “Personal event (future for athletes)”.  
    * Edit/Delete buttons if user has permission.

## **6.3 Event creation/edit form**

* Fields:  
  * Event type (select).  
  * Title.  
  * Description.  
  * Start date/time, end date/time.  
  * Location (simple text).  
  * Opponent (for games).  
  * Event group (Team vs Personal; for v1, mainly Team).  
* Role behavior:  
  * AD and Coach can create and manage team events.  
* Optional section:  
  * Notifications (simple checkbox: “Remind 24 hours before” for v1).

---

## **7\. Global AI assistant**

## **7.1 Access**

* Icon/button in the top nav that opens a right-side drawer or full-height panel.  
* Panel persists as you navigate pages, retaining conversation context.

## **7.2 Panel structure**

* Header:  
  * “Team Management Assistant”.  
  * Small description line (“Ask questions about your team’s academics, health, schedule, and more.”).  
* Pre-built prompt chips row:  
  * “Who is most at risk academically?”  
  * “Summarize key issues for this week.”  
  * “List athletes I should check on today.”  
* Main:  
  * Chat transcript area.  
  * Bottom: input box with “Ask” button.

## **7.3 Context cues**

* Show a small note under the input when on a specific page:  
  * On Academics page: “Context: Academics & eligibility (with current filters).”  
  * On Athlete detail: “Context: \[Athlete Name\].”

---

## **8\. Navigation & layout consistency summary**

Use a single layout pattern so each page feels part of one system:

| Area | Pattern |
| :---- | :---- |
| Top nav | Logo, team selector (future), role label, profile, AI icon |
| Left nav | Overview, Team, Performance, Health & Eligibility, Schedule |
| Pages | Header with title \+ main controls, then KPIs, then table \+ filters \+ optional chart/AI |
| Tables | Consistent look, top filter bar, active filter chips, rightmost action column |
| AI | Page-specific contextual panel \+ one global assistant drawer |

