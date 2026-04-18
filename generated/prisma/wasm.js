
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
  teams: 'teams',
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
  userId: 'userId',
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
  athleteId: 'athleteId',
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

exports.Prisma.WorkoutTemplateScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  createdByUserId: 'createdByUserId',
  name: 'name',
  description: 'description',
  sport: 'sport',
  params: 'params',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkoutMetricScalarFieldEnum = {
  id: 'id',
  workoutTemplateId: 'workoutTemplateId',
  name: 'name',
  targetValue: 'targetValue',
  unit: 'unit',
  params: 'params',
  createdAt: 'createdAt'
};

exports.Prisma.WorkoutInstanceScalarFieldEnum = {
  id: 'id',
  workoutTemplateId: 'workoutTemplateId',
  athleteId: 'athleteId',
  createdByUserId: 'createdByUserId',
  performedAt: 'performedAt',
  notes: 'notes',
  results: 'results',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RankingSourceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  details: 'details',
  createdAt: 'createdAt'
};

exports.Prisma.EventRankingScalarFieldEnum = {
  id: 'id',
  athleteId: 'athleteId',
  rankingSourceId: 'rankingSourceId',
  eventName: 'eventName',
  rank: 'rank',
  region: 'region',
  score: 'score',
  recordedAt: 'recordedAt'
};

exports.Prisma.PersonalRecordScalarFieldEnum = {
  id: 'id',
  athleteId: 'athleteId',
  eventName: 'eventName',
  result: 'result',
  unit: 'unit',
  recordedAt: 'recordedAt',
  notes: 'notes'
};

exports.Prisma.MeetEntryScalarFieldEnum = {
  id: 'id',
  athleteId: 'athleteId',
  teamId: 'teamId',
  eventName: 'eventName',
  heat: 'heat',
  lane: 'lane',
  status: 'status',
  importedFrom: 'importedFrom',
  createdByUserId: 'createdByUserId',
  createdAt: 'createdAt'
};

exports.Prisma.AthleteJournalScalarFieldEnum = {
  id: 'id',
  athleteId: 'athleteId',
  authorId: 'authorId',
  authorRole: 'authorRole',
  title: 'title',
  body: 'body',
  visibility: 'visibility',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserSettingsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  gpaThresholds: 'gpaThresholds',
  medicalStatuses: 'medicalStatuses',
  defaultFilters: 'defaultFilters',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
  COACH: 'COACH',
  ATHLETE: 'ATHLETE'
};

exports.Sport = exports.$Enums.Sport = {
  TRACK_AND_FIELD: 'TRACK_AND_FIELD',
  FOOTBALL: 'FOOTBALL',
  SOCCER: 'SOCCER',
  GENERAL: 'GENERAL'
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
  GENERAL: 'GENERAL',
  SPORT_SPECIFIC: 'SPORT_SPECIFIC'
};

exports.MeasurementUnit = exports.$Enums.MeasurementUnit = {
  METERS: 'METERS',
  KILOMETERS: 'KILOMETERS',
  YARDS: 'YARDS',
  SECONDS: 'SECONDS',
  MINUTES: 'MINUTES',
  HOURS: 'HOURS'
};

exports.Prisma.ModelName = {
  User: 'User',
  Team: 'Team',
  Athlete: 'Athlete',
  AcademicRecord: 'AcademicRecord',
  HealthRecord: 'HealthRecord',
  Event: 'Event',
  Note: 'Note',
  WorkoutTemplate: 'WorkoutTemplate',
  WorkoutMetric: 'WorkoutMetric',
  WorkoutInstance: 'WorkoutInstance',
  RankingSource: 'RankingSource',
  EventRanking: 'EventRanking',
  PersonalRecord: 'PersonalRecord',
  MeetEntry: 'MeetEntry',
  AthleteJournal: 'AthleteJournal',
  UserSettings: 'UserSettings'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
