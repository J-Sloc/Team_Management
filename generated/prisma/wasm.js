
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.0
 * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
 */
Prisma.prismaVersion = {
  client: "6.3.0",
  engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  role: 'role',
  teamId: 'teamId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  name: 'name',
  sport: 'sport',
  institution: 'institution',
  createdAt: 'createdAt'
};

exports.Prisma.AthleteScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  name: 'name',
  jerseyNumber: 'jerseyNumber',
  height: 'height',
  weight: 'weight',
  classYear: 'classYear',
  sport: 'sport',
  events: 'events',
  eventRecords: 'eventRecords',
  gpa: 'gpa',
  academicStanding: 'academicStanding',
  eligibilityYearsLeft: 'eligibilityYearsLeft',
  recruitingStatus: 'recruitingStatus',
  contactInfo: 'contactInfo',
  transferProbability: 'transferProbability',
  medicalStatus: 'medicalStatus',
  complianceStatus: 'complianceStatus',
  riskFlag: 'riskFlag'
};

exports.Prisma.AcademicRecordScalarFieldEnum = {
  id: 'id',
  athleteId: 'athleteId',
  semester: 'semester',
  finalScore: 'finalScore',
  termGpa: 'termGpa',
  academicStanding: 'academicStanding',
  complianceStatus: 'complianceStatus',
  attendancePercent: 'attendancePercent',
  tutoringHours: 'tutoringHours',
  advisorNotes: 'advisorNotes',
  createdAt: 'createdAt'
};

exports.Prisma.HealthRecordScalarFieldEnum = {
  id: 'id',
  athleteId: 'athleteId',
  injuryType: 'injuryType',
  injuryDate: 'injuryDate',
  status: 'status',
  rehabSessions: 'rehabSessions',
  appointmentAttendance: 'appointmentAttendance',
  notes: 'notes',
  createdAt: 'createdAt'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  type: 'type',
  title: 'title',
  description: 'description',
  startTime: 'startTime',
  endTime: 'endTime',
  location: 'location',
  opponent: 'opponent',
  group: 'group',
  createdByUserId: 'createdByUserId',
  createdAt: 'createdAt'
};

exports.Prisma.NoteScalarFieldEnum = {
  id: 'id',
  athleteId: 'athleteId',
  userId: 'userId',
  category: 'category',
  body: 'body',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  AD: 'AD',
  COACH: 'COACH'
};

exports.AcademicStanding = exports.$Enums.AcademicStanding = {
  GOOD: 'GOOD',
  NEUTRAL: 'NEUTRAL',
  BAD: 'BAD'
};

exports.MedicalStatus = exports.$Enums.MedicalStatus = {
  CLEARED: 'CLEARED',
  LIMITED: 'LIMITED',
  NOT_CLEARED: 'NOT_CLEARED'
};

exports.ComplianceStatus = exports.$Enums.ComplianceStatus = {
  COMPLIANT: 'COMPLIANT',
  WARNING: 'WARNING',
  NON_COMPLIANT: 'NON_COMPLIANT'
};

exports.RiskFlag = exports.$Enums.RiskFlag = {
  HIGH: 'HIGH',
  MODERATE: 'MODERATE',
  LOW: 'LOW',
  NONE: 'NONE'
};

exports.EventType = exports.$Enums.EventType = {
  GAME: 'GAME',
  PRACTICE: 'PRACTICE',
  MEETING: 'MEETING',
  MEDICAL: 'MEDICAL',
  ACADEMIC: 'ACADEMIC',
  RECRUITING: 'RECRUITING'
};

exports.EventGroup = exports.$Enums.EventGroup = {
  TEAM: 'TEAM',
  PERSONAL: 'PERSONAL'
};

exports.NoteCategory = exports.$Enums.NoteCategory = {
  ACADEMIC: 'ACADEMIC',
  MEDICAL: 'MEDICAL',
  GENERAL: 'GENERAL'
};

exports.Prisma.ModelName = {
  User: 'User',
  Team: 'Team',
  Athlete: 'Athlete',
  AcademicRecord: 'AcademicRecord',
  HealthRecord: 'HealthRecord',
  Event: 'Event',
  Note: 'Note'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/jaden/team_management/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "/Users/jaden/team_management/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.3.0",
  "engineVersion": "acc0b9dd43eb689cbd20c9470515d719db10d0b0",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../generated/prisma\"\n  previewFeatures = [\"driverAdapters\"] // Add this to enable adapter usage\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id           String   @id @default(cuid())\n  email        String   @unique\n  passwordHash String\n  role         UserRole\n  teamId       String?\n  team         Team?    @relation(fields: [teamId], references: [id])\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n  notes        Note[]\n\n  @@map(\"users\")\n}\n\nmodel Team {\n  id          String    @id @default(cuid())\n  name        String\n  sport       String\n  institution String?\n  users       User[]\n  athletes    Athlete[]\n  events      Event[]\n  createdAt   DateTime  @default(now())\n\n  @@map(\"teams\")\n}\n\nmodel Athlete {\n  id                   String            @id @default(cuid())\n  teamId               String\n  name                 String\n  jerseyNumber         Int?\n  height               Float?\n  weight               Float?\n  classYear            String?\n  sport                String?\n  events               String[]\n  eventRecords         Json? // New: { \"100m\": { personalBest: 10.5, historical: [10.7, 10.6] } }\n  gpa                  Float?\n  academicStanding     AcademicStanding?\n  eligibilityYearsLeft Float?\n  recruitingStatus     String?\n  contactInfo          String?\n  transferProbability  Float?\n  medicalStatus        MedicalStatus?\n  complianceStatus     ComplianceStatus?\n  riskFlag             RiskFlag?\n  team                 Team              @relation(fields: [teamId], references: [id])\n  academicRecords      AcademicRecord[]\n  healthRecords        HealthRecord[]\n  notes                Note[]\n\n  @@index([teamId])\n  @@map(\"athletes\")\n}\n\nmodel AcademicRecord {\n  id                String            @id @default(cuid())\n  athleteId         String\n  semester          String\n  finalScore        Float?\n  termGpa           Float?\n  academicStanding  AcademicStanding?\n  complianceStatus  ComplianceStatus?\n  attendancePercent Float?\n  tutoringHours     Float?\n  advisorNotes      String?\n  createdAt         DateTime          @default(now())\n  athlete           Athlete           @relation(fields: [athleteId], references: [id])\n\n  @@index([athleteId])\n  @@index([semester, academicStanding])\n  @@map(\"academic_records\")\n}\n\nmodel HealthRecord {\n  id                    String         @id @default(cuid())\n  athleteId             String\n  injuryType            String?\n  injuryDate            DateTime?\n  status                MedicalStatus?\n  rehabSessions         Int?\n  appointmentAttendance Float?\n  notes                 String?\n  createdAt             DateTime       @default(now())\n  athlete               Athlete        @relation(fields: [athleteId], references: [id])\n\n  @@index([athleteId])\n  @@map(\"health_records\")\n}\n\nmodel Event {\n  id              String     @id @default(cuid())\n  teamId          String\n  type            EventType\n  title           String\n  description     String?\n  startTime       DateTime\n  endTime         DateTime\n  location        String?\n  opponent        String?\n  group           EventGroup\n  createdByUserId String?\n  createdAt       DateTime   @default(now())\n  team            Team       @relation(fields: [teamId], references: [id])\n\n  @@index([teamId, startTime])\n  @@map(\"events\")\n}\n\nmodel Note {\n  id        String       @id @default(cuid())\n  athleteId String?\n  userId    String\n  category  NoteCategory\n  body      String\n  createdAt DateTime     @default(now())\n  athlete   Athlete?     @relation(fields: [athleteId], references: [id])\n  user      User         @relation(fields: [userId], references: [id])\n\n  @@index([athleteId])\n  @@map(\"notes\")\n}\n\nenum UserRole {\n  AD\n  COACH\n}\n\nenum AcademicStanding {\n  GOOD\n  NEUTRAL\n  BAD\n}\n\nenum MedicalStatus {\n  CLEARED\n  LIMITED\n  NOT_CLEARED\n}\n\nenum ComplianceStatus {\n  COMPLIANT\n  WARNING\n  NON_COMPLIANT\n}\n\nenum RiskFlag {\n  HIGH\n  MODERATE\n  LOW\n  NONE\n}\n\nenum EventType {\n  GAME\n  PRACTICE\n  MEETING\n  MEDICAL\n  ACADEMIC\n  RECRUITING\n}\n\nenum EventGroup {\n  TEAM\n  PERSONAL\n}\n\nenum NoteCategory {\n  ACADEMIC\n  MEDICAL\n  GENERAL\n}\n",
  "inlineSchemaHash": "444ad06bfda48358d8236d3338fae93daf8f5ef0e3ee7dd4cc0aec13e7412023",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"},{\"name\":\"teamId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"team\",\"kind\":\"object\",\"type\":\"Team\",\"relationName\":\"TeamToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"notes\",\"kind\":\"object\",\"type\":\"Note\",\"relationName\":\"NoteToUser\"}],\"dbName\":\"users\"},\"Team\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sport\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"institution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TeamToUser\"},{\"name\":\"athletes\",\"kind\":\"object\",\"type\":\"Athlete\",\"relationName\":\"AthleteToTeam\"},{\"name\":\"events\",\"kind\":\"object\",\"type\":\"Event\",\"relationName\":\"EventToTeam\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"teams\"},\"Athlete\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"teamId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"jerseyNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"height\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"weight\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"classYear\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sport\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"events\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"eventRecords\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"gpa\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"academicStanding\",\"kind\":\"enum\",\"type\":\"AcademicStanding\"},{\"name\":\"eligibilityYearsLeft\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"recruitingStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactInfo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"transferProbability\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"medicalStatus\",\"kind\":\"enum\",\"type\":\"MedicalStatus\"},{\"name\":\"complianceStatus\",\"kind\":\"enum\",\"type\":\"ComplianceStatus\"},{\"name\":\"riskFlag\",\"kind\":\"enum\",\"type\":\"RiskFlag\"},{\"name\":\"team\",\"kind\":\"object\",\"type\":\"Team\",\"relationName\":\"AthleteToTeam\"},{\"name\":\"academicRecords\",\"kind\":\"object\",\"type\":\"AcademicRecord\",\"relationName\":\"AcademicRecordToAthlete\"},{\"name\":\"healthRecords\",\"kind\":\"object\",\"type\":\"HealthRecord\",\"relationName\":\"AthleteToHealthRecord\"},{\"name\":\"notes\",\"kind\":\"object\",\"type\":\"Note\",\"relationName\":\"AthleteToNote\"}],\"dbName\":\"athletes\"},\"AcademicRecord\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"athleteId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"semester\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"finalScore\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"termGpa\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"academicStanding\",\"kind\":\"enum\",\"type\":\"AcademicStanding\"},{\"name\":\"complianceStatus\",\"kind\":\"enum\",\"type\":\"ComplianceStatus\"},{\"name\":\"attendancePercent\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"tutoringHours\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"advisorNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"athlete\",\"kind\":\"object\",\"type\":\"Athlete\",\"relationName\":\"AcademicRecordToAthlete\"}],\"dbName\":\"academic_records\"},\"HealthRecord\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"athleteId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"injuryType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"injuryDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"MedicalStatus\"},{\"name\":\"rehabSessions\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"appointmentAttendance\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"athlete\",\"kind\":\"object\",\"type\":\"Athlete\",\"relationName\":\"AthleteToHealthRecord\"}],\"dbName\":\"health_records\"},\"Event\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"teamId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"EventType\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startTime\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endTime\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"opponent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"group\",\"kind\":\"enum\",\"type\":\"EventGroup\"},{\"name\":\"createdByUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"team\",\"kind\":\"object\",\"type\":\"Team\",\"relationName\":\"EventToTeam\"}],\"dbName\":\"events\"},\"Note\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"athleteId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"enum\",\"type\":\"NoteCategory\"},{\"name\":\"body\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"athlete\",\"kind\":\"object\",\"type\":\"Athlete\",\"relationName\":\"AthleteToNote\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"NoteToUser\"}],\"dbName\":\"notes\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

