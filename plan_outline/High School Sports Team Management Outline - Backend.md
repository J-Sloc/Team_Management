## **1\. What “backend” does in your app**

## **The backend is the “server” that:**

* ## **Stores data persistently (athletes, academic records, health records, events).**

* ## **Handles business logic:**

  * ## **“Does this coach have permission to edit this team’s data?”**

  * ## **“Apply these academic filters and return the matching records.”**

  * ## **“Build context for the AI assistant and call the LLM.”**

* ## **Serves data to the frontend via APIs (JSON responses).**

* ## **Enforces security:**

  * ## **Password hashing.**

  * ## **Role-based access control (RBAC).**

## **Your frontend talks to the backend via HTTP requests:**

## **Frontend: "Give me all academic records for semester=Fall 2025 and standing=Bad"**

## **Backend: "Check permissions → Query DB → Return JSON"**

## **Frontend: "Display table"**

## ---

## **2\. PostgreSQL: the database choice**

## **PostgreSQL (Postgres) is a relational database.**

## **2.1 What’s a relational database?**

* ## **Stores data in tables (like Excel sheets).**

* ## **Each row is a record (e.g., one Athlete).**

* ## **Each column is a field (e.g., name, gpa).**

* ## **Relationships between tables:**

  * ## **AcademicRecord.athleteId → Athlete.id (foreign key).**

  * ## **One athlete can have many academic records.**

## **2.2 Why Postgres for you?**

* ## **Structured data: your athletes, records, events fit perfectly in tables.**

* ## **Joins: you can easily do “Give me athletes \+ their latest academic record.”**

* ## **Performance:**

  * ## **Indexes make queries fast even with millions of rows.**

  * ## **JSON support (for flexible fields like positions: \["WR", "DB"\]).**

* ## **ACID transactions: when you update an athlete’s GPA and compliance status, both changes happen or neither does.**

* ## **Managed services: Supabase, Neon, AWS RDS handle backups, scaling, monitoring.**

* ## **Universal: every developer knows Postgres; no learning curve.**

## **Alternatives you’re *not* using:**

* ## **MongoDB (NoSQL): good for unstructured data, but your data is structured.**

* ## **SQLite: fine for v0, but doesn’t scale to multiple users.**

## ---

## **3\. Prisma: the database interface (ORM)**

## **Prisma is an ORM (Object-Relational Mapper).**

## **Without Prisma, you’d write raw SQL:**

## **SELECT a.name, ar.gpa, ar.complianceStatus**

## **FROM athletes a**

## **JOIN academic\_records ar ON a.id \= ar.athleteId**

## **WHERE ar.semester \= 'Fall 2025'**

##   **AND ar.academicStanding \= 'Bad';**

## 

## **With Prisma:**

## **const records \= await prisma.academicRecord.findMany({**

##   **where: {**

##     **semester: 'Fall 2025',**

##     **academicStanding: 'Bad',**

##   **},**

##   **include: {**

##     **athlete: true,  // joins automatically**

##   **},**

## **});**

## **3.1 What Prisma does for you**

* ## **Schema-first: you define your tables in a .prisma file:**

## **model Athlete {**

##   **id                  String   @id @default(cuid())**

##   **name                String**

##   **gpa                 Float**

##   **academicRecords     AcademicRecord\[\]**

## **}**

* ## 

* ## **Auto-generates:**

  * ## **TypeScript types (your frontend and backend share exact same Athlete type).**

  * ## **Migrations (schema changes become safe DB updates).**

  * ## **Client library (the prisma.academicRecord.findMany() code).**

* ## **Query builder: type-safe queries with autocomplete.**

* ## **Relations: automatic joins (include: { athlete: true }).**

## **3.2 Why Prisma scales**

* ## **Performance: Prisma compiles to optimized SQL; you can write raw SQL when needed.**

* ## **Team-friendly: schema is the single source of truth; everyone sees changes.**

* ## **Used at scale: companies like Vercel, GitHub use Prisma in production.​**

## **Downsides (to be aware of):**

* ## **Slightly less flexible than raw SQL for very complex queries.**

* ## **Some enterprise teams prefer custom query layers later.**

## **For your v1 → v3, Prisma is perfect.**

## ---

## **4\. Next.js API routes: backend endpoints in your frontend repo**

## **Next.js API routes let you create backend endpoints alongside your frontend pages.**

## **File structure:**

## **app/**

##   **├── academics/**

##   **│   └── page.tsx           // frontend page**

##   **└── api/**

##       **├── athletes/**

##       **│   └── route.ts        // GET /api/athletes**

##       **└── academic-records/**

##           **└── route.ts        // GET /api/academic-records**

## **Inside app/api/academic-records/route.ts:**

## **export async function GET(request: Request) {**

##   **const url \= new URL(request.url);**

##   **const semester \= url.searchParams.get('semester');**

##   

##   **const records \= await prisma.academicRecord.findMany({**

##     **where: { semester },**

##     **include: { athlete: true },**

##   **});**

##   

##   **return Response.json(records);**

## **}**

## **4.1 Why API routes for v1?**

* ## **Simplicity: one repo, one deploy.**

* ## **Shared types: frontend and backend use same Prisma-generated types.**

* ## **Serverless: Vercel scales each request automatically.**

* ## **Fast iteration: change backend \+ frontend, deploy once.**

## **4.2 Scaling API routes**

## **Up to 1K concurrent users: stays the same, Vercel handles it.**

## **Beyond 1K:**

* ## **Extract to dedicated backend:**

  * ## **Copy API route logic to NestJS or FastAPI.**

  * ## **Deploy separately.**

  * ## **Frontend continues to call the same /api/athletes URLs.**

* ## **No rewrite needed: your frontend doesn’t change.**

## **Example migration path:**

## **text**

## **`v1: Next.js API routes → Vercel`**

## **`v2: Still Next.js API routes → Vercel + bigger DB`**

## **`v3: NestJS backend → Kubernetes + Next.js frontend → Vercel`**

## ---

## **5\. Backend scaling paths**

## **5.1 Database scaling (most important)**

Phase 1 (v1): Single Postgres instance (1 CPU, 4GB RAM, \~$50/mo).

Phase 2 (100–1K users):

* Read replicas: 2–4 additional Postgres instances for reads only.  
  * Backend points reads to replicas, writes to primary.  
  * Prisma: ?readOnly=true for read queries.  
* Connection pooling: PgBouncer handles 100s of connections.

Phase 3 (enterprise):

* Sharding: split data by institutionId.  
  * Institution A → DB cluster 1\.  
  * Institution B → DB cluster 2\.  
* Distributed SQL: CockroachDB (Postgres-compatible) for global scale.

Cost progression:

* v1: $50/mo  
* v2: $500/mo  
* Enterprise: $5K+/mo

## **5.2 Backend service scaling**

Phase 1–2: Next.js API routes (serverless, auto-scales).

Phase 3: Dedicated backend service:

* NestJS (TypeScript, enterprise patterns).  
* Horizontal scaling: 10 pods → 100 pods based on load.  
* Caching: Redis for frequent queries (e.g., team rosters).

## **5.3 AI scaling (special case)**

v1: Call OpenAI/Anthropic directly from API routes.

Growth:

* Rate limiting: limit AI queries per user/minute.  
* Caching: cache common responses (Redis).  
* Dedicated AI service: separate microservice with queueing.  
* Custom models: fine-tune or use cheaper providers (Groq, Anthropic Claude).

Cost: $0.01–$0.10 per AI query → $100–1K/mo at scale.

---

## **6\. Full stack scaling timeline**

| Stage | Users | DB | Backend | Frontend | Monthly Cost |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **v1** | 1–10 | Single Postgres | Next.js API | Next.js | $50 |
| **v2** | 10–100 | \+ Read replicas | Next.js API | Next.js | $500 |
| **v3** | 100–1K | \+ Pooling | NestJS (optional) | Next.js | $2K |
| **v4** | 1K–10K | Sharded | NestJS \+ microservices | Next.js | $10K+ |

## **7\. Prisma Schema**

generator client {  
  provider \= "prisma-client-js"  
}

datasource db {  
  provider \= "postgresql"  
  url      \= env("DATABASE\_URL")  
}

model User {  
  id        String   @id @default(cuid())  
  email     String   @unique  
  passwordHash String  
  role      UserRole  
  teamId    String?  
  team      Team?    @relation(fields: \[teamId\], references: \[id\])  
  createdAt DateTime @default(now())  
  updatedAt DateTime @updatedAt

  @@map("users")  
}

model Team {  
  id          String        @id @default(cuid())  
  name        String  
  sport       String  
  institution String?  
  users       User\[\]  
  athletes    Athlete\[\]  
  events      Event\[\]  
  createdAt   DateTime      @default(now())

  @@map("teams")  
}

model Athlete {  
  id                    String          @id @default(cuid())  
  teamId                String  
  name                  String  
  jerseyNumber          Int?  
  height                Float?  
  weight                Float?  
  classYear             String?  
  major                 String?  
  gpa                   Float?  
  academicStanding      AcademicStanding?  
  eligibilityYearsLeft  Float?  
  scholarshipStatus     String?  
  contactInfo           String?  
  transferProbability   Float?  
  medicalStatus         MedicalStatus?  
  complianceStatus      ComplianceStatus?  
  riskFlag              RiskFlag?  
  team                  Team             @relation(fields: \[teamId\], references: \[id\])  
  academicRecords       AcademicRecord\[\]  
  healthRecords         HealthRecord\[\]  
  notes                 Note\[\]

  @@index(\[teamId\])  
  @@map("athletes")  
}

model AcademicRecord {  
  id                 String   @id @default(cuid())  
  athleteId          String  
  semester           String  
  finalScore         Float?  
  termGpa            Float?  
  academicStanding   AcademicStanding?  
  complianceStatus   ComplianceStatus?  
  attendancePercent  Float?  
  tutoringHours      Float?  
  advisorNotes       String?  
  createdAt          DateTime @default(now())  
  athlete            Athlete  @relation(fields: \[athleteId\], references: \[id\])

  @@index(\[athleteId\])  
  @@index(\[semester, academicStanding\])  
  @@map("academic\_records")  
}

model HealthRecord {  
  id                      String   @id @default(cuid())  
  athleteId               String  
  injuryType              String?  
  injuryDate              DateTime?  
  status                  MedicalStatus?  
  rehabSessions           Int?  
  appointmentAttendance   Float?  
  notes                   String?  
  createdAt               DateTime @default(now())  
  athlete                 Athlete  @relation(fields: \[athleteId\], references: \[id\])

  @@index(\[athleteId\])  
  @@map("health\_records")  
}

model Event {  
  id          String   @id @default(cuid())  
  teamId      String  
  type        EventType  
  title       String  
  description String?  
  startTime   DateTime  
  endTime     DateTime  
  location    String?  
  opponent    String?  
  group       EventGroup  
  createdByUserId String?  
  createdAt   DateTime @default(now())  
  team        Team     @relation(fields: \[teamId\], references: \[id\])

  @@index(\[teamId, startTime\])  
  @@map("events")  
}

model Note {  
  id        String   @id @default(cuid())  
  athleteId String?  
  userId    String  
  category  NoteCategory  
  body      String  
  createdAt DateTime @default(now())  
  athlete   Athlete? @relation(fields: \[athleteId\], references: \[id\])  
  user      User     @relation(fields: \[userId\], references: \[id\])

  @@index(\[athleteId\])  
  @@map("notes")  
}

enum UserRole {  
  AD  
  COACH  
}

enum AcademicStanding {  
  GOOD  
  NEUTRAL  
  BAD  
}

enum MedicalStatus {  
  CLEARED  
  LIMITED  
  NOT\_CLEARED  
}

enum ComplianceStatus {  
  COMPLIANT  
  WARNING  
  NON\_COMPLIANT  
}

enum RiskFlag {  
  HIGH  
  MODERATE  
  LOW  
  NONE  
}

enum EventType {  
  GAME  
  PRACTICE  
  MEETING  
  MEDICAL  
  ACADEMIC  
  RECRUITING  
}

enum EventGroup {  
  TEAM  
  PERSONAL  
}

enum NoteCategory {  
  ACADEMIC  
  MEDICAL  
  GENERAL  
}

