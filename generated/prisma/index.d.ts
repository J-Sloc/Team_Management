
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model Athlete
 * 
 */
export type Athlete = $Result.DefaultSelection<Prisma.$AthletePayload>
/**
 * Model AcademicRecord
 * 
 */
export type AcademicRecord = $Result.DefaultSelection<Prisma.$AcademicRecordPayload>
/**
 * Model HealthRecord
 * 
 */
export type HealthRecord = $Result.DefaultSelection<Prisma.$HealthRecordPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Note
 * 
 */
export type Note = $Result.DefaultSelection<Prisma.$NotePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  AD: 'AD',
  COACH: 'COACH'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AcademicStanding: {
  GOOD: 'GOOD',
  NEUTRAL: 'NEUTRAL',
  BAD: 'BAD'
};

export type AcademicStanding = (typeof AcademicStanding)[keyof typeof AcademicStanding]


export const MedicalStatus: {
  CLEARED: 'CLEARED',
  LIMITED: 'LIMITED',
  NOT_CLEARED: 'NOT_CLEARED'
};

export type MedicalStatus = (typeof MedicalStatus)[keyof typeof MedicalStatus]


export const ComplianceStatus: {
  COMPLIANT: 'COMPLIANT',
  WARNING: 'WARNING',
  NON_COMPLIANT: 'NON_COMPLIANT'
};

export type ComplianceStatus = (typeof ComplianceStatus)[keyof typeof ComplianceStatus]


export const RiskFlag: {
  HIGH: 'HIGH',
  MODERATE: 'MODERATE',
  LOW: 'LOW',
  NONE: 'NONE'
};

export type RiskFlag = (typeof RiskFlag)[keyof typeof RiskFlag]


export const EventType: {
  GAME: 'GAME',
  PRACTICE: 'PRACTICE',
  MEETING: 'MEETING',
  MEDICAL: 'MEDICAL',
  ACADEMIC: 'ACADEMIC',
  RECRUITING: 'RECRUITING'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const EventGroup: {
  TEAM: 'TEAM',
  PERSONAL: 'PERSONAL'
};

export type EventGroup = (typeof EventGroup)[keyof typeof EventGroup]


export const NoteCategory: {
  ACADEMIC: 'ACADEMIC',
  MEDICAL: 'MEDICAL',
  GENERAL: 'GENERAL'
};

export type NoteCategory = (typeof NoteCategory)[keyof typeof NoteCategory]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AcademicStanding = $Enums.AcademicStanding

export const AcademicStanding: typeof $Enums.AcademicStanding

export type MedicalStatus = $Enums.MedicalStatus

export const MedicalStatus: typeof $Enums.MedicalStatus

export type ComplianceStatus = $Enums.ComplianceStatus

export const ComplianceStatus: typeof $Enums.ComplianceStatus

export type RiskFlag = $Enums.RiskFlag

export const RiskFlag: typeof $Enums.RiskFlag

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type EventGroup = $Enums.EventGroup

export const EventGroup: typeof $Enums.EventGroup

export type NoteCategory = $Enums.NoteCategory

export const NoteCategory: typeof $Enums.NoteCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.athlete`: Exposes CRUD operations for the **Athlete** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Athletes
    * const athletes = await prisma.athlete.findMany()
    * ```
    */
  get athlete(): Prisma.AthleteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicRecord`: Exposes CRUD operations for the **AcademicRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicRecords
    * const academicRecords = await prisma.academicRecord.findMany()
    * ```
    */
  get academicRecord(): Prisma.AcademicRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.healthRecord`: Exposes CRUD operations for the **HealthRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HealthRecords
    * const healthRecords = await prisma.healthRecord.findMany()
    * ```
    */
  get healthRecord(): Prisma.HealthRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.note.findMany()
    * ```
    */
  get note(): Prisma.NoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.3.0
   * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Team: 'Team',
    Athlete: 'Athlete',
    AcademicRecord: 'AcademicRecord',
    HealthRecord: 'HealthRecord',
    Event: 'Event',
    Note: 'Note'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "team" | "athlete" | "academicRecord" | "healthRecord" | "event" | "note"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      Athlete: {
        payload: Prisma.$AthletePayload<ExtArgs>
        fields: Prisma.AthleteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AthleteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AthleteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          findFirst: {
            args: Prisma.AthleteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AthleteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          findMany: {
            args: Prisma.AthleteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          create: {
            args: Prisma.AthleteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          createMany: {
            args: Prisma.AthleteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AthleteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          delete: {
            args: Prisma.AthleteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          update: {
            args: Prisma.AthleteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          deleteMany: {
            args: Prisma.AthleteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AthleteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AthleteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          upsert: {
            args: Prisma.AthleteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          aggregate: {
            args: Prisma.AthleteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAthlete>
          }
          groupBy: {
            args: Prisma.AthleteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AthleteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AthleteCountArgs<ExtArgs>
            result: $Utils.Optional<AthleteCountAggregateOutputType> | number
          }
        }
      }
      AcademicRecord: {
        payload: Prisma.$AcademicRecordPayload<ExtArgs>
        fields: Prisma.AcademicRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>
          }
          findFirst: {
            args: Prisma.AcademicRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>
          }
          findMany: {
            args: Prisma.AcademicRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>[]
          }
          create: {
            args: Prisma.AcademicRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>
          }
          createMany: {
            args: Prisma.AcademicRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>[]
          }
          delete: {
            args: Prisma.AcademicRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>
          }
          update: {
            args: Prisma.AcademicRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>
          }
          deleteMany: {
            args: Prisma.AcademicRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcademicRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>[]
          }
          upsert: {
            args: Prisma.AcademicRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicRecordPayload>
          }
          aggregate: {
            args: Prisma.AcademicRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicRecord>
          }
          groupBy: {
            args: Prisma.AcademicRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicRecordCountAggregateOutputType> | number
          }
        }
      }
      HealthRecord: {
        payload: Prisma.$HealthRecordPayload<ExtArgs>
        fields: Prisma.HealthRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HealthRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HealthRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>
          }
          findFirst: {
            args: Prisma.HealthRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HealthRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>
          }
          findMany: {
            args: Prisma.HealthRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>[]
          }
          create: {
            args: Prisma.HealthRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>
          }
          createMany: {
            args: Prisma.HealthRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HealthRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>[]
          }
          delete: {
            args: Prisma.HealthRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>
          }
          update: {
            args: Prisma.HealthRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>
          }
          deleteMany: {
            args: Prisma.HealthRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HealthRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HealthRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>[]
          }
          upsert: {
            args: Prisma.HealthRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthRecordPayload>
          }
          aggregate: {
            args: Prisma.HealthRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHealthRecord>
          }
          groupBy: {
            args: Prisma.HealthRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<HealthRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.HealthRecordCountArgs<ExtArgs>
            result: $Utils.Optional<HealthRecordCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Note: {
        payload: Prisma.$NotePayload<ExtArgs>
        fields: Prisma.NoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findFirst: {
            args: Prisma.NoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findMany: {
            args: Prisma.NoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          create: {
            args: Prisma.NoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          createMany: {
            args: Prisma.NoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          delete: {
            args: Prisma.NoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          update: {
            args: Prisma.NoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          deleteMany: {
            args: Prisma.NoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          upsert: {
            args: Prisma.NoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          aggregate: {
            args: Prisma.NoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote>
          }
          groupBy: {
            args: Prisma.NoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteCountArgs<ExtArgs>
            result: $Utils.Optional<NoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.DriverAdapter | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    team?: TeamOmit
    athlete?: AthleteOmit
    academicRecord?: AcademicRecordOmit
    healthRecord?: HealthRecordOmit
    event?: EventOmit
    note?: NoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    notes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | UserCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    users: number
    athletes: number
    events: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | TeamCountOutputTypeCountUsersArgs
    athletes?: boolean | TeamCountOutputTypeCountAthletesArgs
    events?: boolean | TeamCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountAthletesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AthleteWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type AthleteCountOutputType
   */

  export type AthleteCountOutputType = {
    academicRecords: number
    healthRecords: number
    notes: number
  }

  export type AthleteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    academicRecords?: boolean | AthleteCountOutputTypeCountAcademicRecordsArgs
    healthRecords?: boolean | AthleteCountOutputTypeCountHealthRecordsArgs
    notes?: boolean | AthleteCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * AthleteCountOutputType without action
   */
  export type AthleteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AthleteCountOutputType
     */
    select?: AthleteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AthleteCountOutputType without action
   */
  export type AthleteCountOutputTypeCountAcademicRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicRecordWhereInput
  }

  /**
   * AthleteCountOutputType without action
   */
  export type AthleteCountOutputTypeCountHealthRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthRecordWhereInput
  }

  /**
   * AthleteCountOutputType without action
   */
  export type AthleteCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    teamId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    teamId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    teamId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    teamId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    teamId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    teamId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    teamId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    teamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | User$teamArgs<ExtArgs>
    notes?: boolean | User$notesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    teamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | User$teamArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    teamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | User$teamArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    teamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "teamId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | User$teamArgs<ExtArgs>
    notes?: boolean | User$notesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | User$teamArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | User$teamArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs> | null
      notes: Prisma.$NotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      teamId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends User$teamArgs<ExtArgs> = {}>(args?: Subset<T, User$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    notes<T extends User$notesArgs<ExtArgs> = {}>(args?: Subset<T, User$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly teamId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.team
   */
  export type User$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * User.notes
   */
  export type User$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    name: string | null
    sport: string | null
    institution: string | null
    createdAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    name: string | null
    sport: string | null
    institution: string | null
    createdAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    name: number
    sport: number
    institution: number
    createdAt: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    name?: true
    sport?: true
    institution?: true
    createdAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    name?: true
    sport?: true
    institution?: true
    createdAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    name?: true
    sport?: true
    institution?: true
    createdAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    name: string
    sport: string
    institution: string | null
    createdAt: Date
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sport?: boolean
    institution?: boolean
    createdAt?: boolean
    users?: boolean | Team$usersArgs<ExtArgs>
    athletes?: boolean | Team$athletesArgs<ExtArgs>
    events?: boolean | Team$eventsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sport?: boolean
    institution?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sport?: boolean
    institution?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    name?: boolean
    sport?: boolean
    institution?: boolean
    createdAt?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "sport" | "institution" | "createdAt", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Team$usersArgs<ExtArgs>
    athletes?: boolean | Team$athletesArgs<ExtArgs>
    events?: boolean | Team$eventsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      athletes: Prisma.$AthletePayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      sport: string
      institution: string | null
      createdAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Team$usersArgs<ExtArgs> = {}>(args?: Subset<T, Team$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    athletes<T extends Team$athletesArgs<ExtArgs> = {}>(args?: Subset<T, Team$athletesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    events<T extends Team$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Team$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */ 
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly sport: FieldRef<"Team", 'String'>
    readonly institution: FieldRef<"Team", 'String'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.users
   */
  export type Team$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Team.athletes
   */
  export type Team$athletesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    where?: AthleteWhereInput
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    cursor?: AthleteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Team.events
   */
  export type Team$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model Athlete
   */

  export type AggregateAthlete = {
    _count: AthleteCountAggregateOutputType | null
    _avg: AthleteAvgAggregateOutputType | null
    _sum: AthleteSumAggregateOutputType | null
    _min: AthleteMinAggregateOutputType | null
    _max: AthleteMaxAggregateOutputType | null
  }

  export type AthleteAvgAggregateOutputType = {
    jerseyNumber: number | null
    height: number | null
    weight: number | null
    gpa: number | null
    eligibilityYearsLeft: number | null
    transferProbability: number | null
  }

  export type AthleteSumAggregateOutputType = {
    jerseyNumber: number | null
    height: number | null
    weight: number | null
    gpa: number | null
    eligibilityYearsLeft: number | null
    transferProbability: number | null
  }

  export type AthleteMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    name: string | null
    jerseyNumber: number | null
    height: number | null
    weight: number | null
    classYear: string | null
    sport: string | null
    gpa: number | null
    academicStanding: $Enums.AcademicStanding | null
    eligibilityYearsLeft: number | null
    recruitingStatus: string | null
    contactInfo: string | null
    transferProbability: number | null
    medicalStatus: $Enums.MedicalStatus | null
    complianceStatus: $Enums.ComplianceStatus | null
    riskFlag: $Enums.RiskFlag | null
  }

  export type AthleteMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    name: string | null
    jerseyNumber: number | null
    height: number | null
    weight: number | null
    classYear: string | null
    sport: string | null
    gpa: number | null
    academicStanding: $Enums.AcademicStanding | null
    eligibilityYearsLeft: number | null
    recruitingStatus: string | null
    contactInfo: string | null
    transferProbability: number | null
    medicalStatus: $Enums.MedicalStatus | null
    complianceStatus: $Enums.ComplianceStatus | null
    riskFlag: $Enums.RiskFlag | null
  }

  export type AthleteCountAggregateOutputType = {
    id: number
    teamId: number
    name: number
    jerseyNumber: number
    height: number
    weight: number
    classYear: number
    sport: number
    events: number
    eventRecords: number
    gpa: number
    academicStanding: number
    eligibilityYearsLeft: number
    recruitingStatus: number
    contactInfo: number
    transferProbability: number
    medicalStatus: number
    complianceStatus: number
    riskFlag: number
    _all: number
  }


  export type AthleteAvgAggregateInputType = {
    jerseyNumber?: true
    height?: true
    weight?: true
    gpa?: true
    eligibilityYearsLeft?: true
    transferProbability?: true
  }

  export type AthleteSumAggregateInputType = {
    jerseyNumber?: true
    height?: true
    weight?: true
    gpa?: true
    eligibilityYearsLeft?: true
    transferProbability?: true
  }

  export type AthleteMinAggregateInputType = {
    id?: true
    teamId?: true
    name?: true
    jerseyNumber?: true
    height?: true
    weight?: true
    classYear?: true
    sport?: true
    gpa?: true
    academicStanding?: true
    eligibilityYearsLeft?: true
    recruitingStatus?: true
    contactInfo?: true
    transferProbability?: true
    medicalStatus?: true
    complianceStatus?: true
    riskFlag?: true
  }

  export type AthleteMaxAggregateInputType = {
    id?: true
    teamId?: true
    name?: true
    jerseyNumber?: true
    height?: true
    weight?: true
    classYear?: true
    sport?: true
    gpa?: true
    academicStanding?: true
    eligibilityYearsLeft?: true
    recruitingStatus?: true
    contactInfo?: true
    transferProbability?: true
    medicalStatus?: true
    complianceStatus?: true
    riskFlag?: true
  }

  export type AthleteCountAggregateInputType = {
    id?: true
    teamId?: true
    name?: true
    jerseyNumber?: true
    height?: true
    weight?: true
    classYear?: true
    sport?: true
    events?: true
    eventRecords?: true
    gpa?: true
    academicStanding?: true
    eligibilityYearsLeft?: true
    recruitingStatus?: true
    contactInfo?: true
    transferProbability?: true
    medicalStatus?: true
    complianceStatus?: true
    riskFlag?: true
    _all?: true
  }

  export type AthleteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Athlete to aggregate.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Athletes
    **/
    _count?: true | AthleteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AthleteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AthleteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AthleteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AthleteMaxAggregateInputType
  }

  export type GetAthleteAggregateType<T extends AthleteAggregateArgs> = {
        [P in keyof T & keyof AggregateAthlete]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAthlete[P]>
      : GetScalarType<T[P], AggregateAthlete[P]>
  }




  export type AthleteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AthleteWhereInput
    orderBy?: AthleteOrderByWithAggregationInput | AthleteOrderByWithAggregationInput[]
    by: AthleteScalarFieldEnum[] | AthleteScalarFieldEnum
    having?: AthleteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AthleteCountAggregateInputType | true
    _avg?: AthleteAvgAggregateInputType
    _sum?: AthleteSumAggregateInputType
    _min?: AthleteMinAggregateInputType
    _max?: AthleteMaxAggregateInputType
  }

  export type AthleteGroupByOutputType = {
    id: string
    teamId: string
    name: string
    jerseyNumber: number | null
    height: number | null
    weight: number | null
    classYear: string | null
    sport: string | null
    events: string[]
    eventRecords: JsonValue | null
    gpa: number | null
    academicStanding: $Enums.AcademicStanding | null
    eligibilityYearsLeft: number | null
    recruitingStatus: string | null
    contactInfo: string | null
    transferProbability: number | null
    medicalStatus: $Enums.MedicalStatus | null
    complianceStatus: $Enums.ComplianceStatus | null
    riskFlag: $Enums.RiskFlag | null
    _count: AthleteCountAggregateOutputType | null
    _avg: AthleteAvgAggregateOutputType | null
    _sum: AthleteSumAggregateOutputType | null
    _min: AthleteMinAggregateOutputType | null
    _max: AthleteMaxAggregateOutputType | null
  }

  type GetAthleteGroupByPayload<T extends AthleteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AthleteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AthleteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AthleteGroupByOutputType[P]>
            : GetScalarType<T[P], AthleteGroupByOutputType[P]>
        }
      >
    >


  export type AthleteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    name?: boolean
    jerseyNumber?: boolean
    height?: boolean
    weight?: boolean
    classYear?: boolean
    sport?: boolean
    events?: boolean
    eventRecords?: boolean
    gpa?: boolean
    academicStanding?: boolean
    eligibilityYearsLeft?: boolean
    recruitingStatus?: boolean
    contactInfo?: boolean
    transferProbability?: boolean
    medicalStatus?: boolean
    complianceStatus?: boolean
    riskFlag?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    academicRecords?: boolean | Athlete$academicRecordsArgs<ExtArgs>
    healthRecords?: boolean | Athlete$healthRecordsArgs<ExtArgs>
    notes?: boolean | Athlete$notesArgs<ExtArgs>
    _count?: boolean | AthleteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    name?: boolean
    jerseyNumber?: boolean
    height?: boolean
    weight?: boolean
    classYear?: boolean
    sport?: boolean
    events?: boolean
    eventRecords?: boolean
    gpa?: boolean
    academicStanding?: boolean
    eligibilityYearsLeft?: boolean
    recruitingStatus?: boolean
    contactInfo?: boolean
    transferProbability?: boolean
    medicalStatus?: boolean
    complianceStatus?: boolean
    riskFlag?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    name?: boolean
    jerseyNumber?: boolean
    height?: boolean
    weight?: boolean
    classYear?: boolean
    sport?: boolean
    events?: boolean
    eventRecords?: boolean
    gpa?: boolean
    academicStanding?: boolean
    eligibilityYearsLeft?: boolean
    recruitingStatus?: boolean
    contactInfo?: boolean
    transferProbability?: boolean
    medicalStatus?: boolean
    complianceStatus?: boolean
    riskFlag?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectScalar = {
    id?: boolean
    teamId?: boolean
    name?: boolean
    jerseyNumber?: boolean
    height?: boolean
    weight?: boolean
    classYear?: boolean
    sport?: boolean
    events?: boolean
    eventRecords?: boolean
    gpa?: boolean
    academicStanding?: boolean
    eligibilityYearsLeft?: boolean
    recruitingStatus?: boolean
    contactInfo?: boolean
    transferProbability?: boolean
    medicalStatus?: boolean
    complianceStatus?: boolean
    riskFlag?: boolean
  }

  export type AthleteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "name" | "jerseyNumber" | "height" | "weight" | "classYear" | "sport" | "events" | "eventRecords" | "gpa" | "academicStanding" | "eligibilityYearsLeft" | "recruitingStatus" | "contactInfo" | "transferProbability" | "medicalStatus" | "complianceStatus" | "riskFlag", ExtArgs["result"]["athlete"]>
  export type AthleteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    academicRecords?: boolean | Athlete$academicRecordsArgs<ExtArgs>
    healthRecords?: boolean | Athlete$healthRecordsArgs<ExtArgs>
    notes?: boolean | Athlete$notesArgs<ExtArgs>
    _count?: boolean | AthleteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AthleteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type AthleteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }

  export type $AthletePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Athlete"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      academicRecords: Prisma.$AcademicRecordPayload<ExtArgs>[]
      healthRecords: Prisma.$HealthRecordPayload<ExtArgs>[]
      notes: Prisma.$NotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      name: string
      jerseyNumber: number | null
      height: number | null
      weight: number | null
      classYear: string | null
      sport: string | null
      events: string[]
      eventRecords: Prisma.JsonValue | null
      gpa: number | null
      academicStanding: $Enums.AcademicStanding | null
      eligibilityYearsLeft: number | null
      recruitingStatus: string | null
      contactInfo: string | null
      transferProbability: number | null
      medicalStatus: $Enums.MedicalStatus | null
      complianceStatus: $Enums.ComplianceStatus | null
      riskFlag: $Enums.RiskFlag | null
    }, ExtArgs["result"]["athlete"]>
    composites: {}
  }

  type AthleteGetPayload<S extends boolean | null | undefined | AthleteDefaultArgs> = $Result.GetResult<Prisma.$AthletePayload, S>

  type AthleteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AthleteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AthleteCountAggregateInputType | true
    }

  export interface AthleteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Athlete'], meta: { name: 'Athlete' } }
    /**
     * Find zero or one Athlete that matches the filter.
     * @param {AthleteFindUniqueArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AthleteFindUniqueArgs>(args: SelectSubset<T, AthleteFindUniqueArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Athlete that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AthleteFindUniqueOrThrowArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AthleteFindUniqueOrThrowArgs>(args: SelectSubset<T, AthleteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Athlete that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindFirstArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AthleteFindFirstArgs>(args?: SelectSubset<T, AthleteFindFirstArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Athlete that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindFirstOrThrowArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AthleteFindFirstOrThrowArgs>(args?: SelectSubset<T, AthleteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Athletes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Athletes
     * const athletes = await prisma.athlete.findMany()
     * 
     * // Get first 10 Athletes
     * const athletes = await prisma.athlete.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const athleteWithIdOnly = await prisma.athlete.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AthleteFindManyArgs>(args?: SelectSubset<T, AthleteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Athlete.
     * @param {AthleteCreateArgs} args - Arguments to create a Athlete.
     * @example
     * // Create one Athlete
     * const Athlete = await prisma.athlete.create({
     *   data: {
     *     // ... data to create a Athlete
     *   }
     * })
     * 
     */
    create<T extends AthleteCreateArgs>(args: SelectSubset<T, AthleteCreateArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Athletes.
     * @param {AthleteCreateManyArgs} args - Arguments to create many Athletes.
     * @example
     * // Create many Athletes
     * const athlete = await prisma.athlete.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AthleteCreateManyArgs>(args?: SelectSubset<T, AthleteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Athletes and returns the data saved in the database.
     * @param {AthleteCreateManyAndReturnArgs} args - Arguments to create many Athletes.
     * @example
     * // Create many Athletes
     * const athlete = await prisma.athlete.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Athletes and only return the `id`
     * const athleteWithIdOnly = await prisma.athlete.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AthleteCreateManyAndReturnArgs>(args?: SelectSubset<T, AthleteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Athlete.
     * @param {AthleteDeleteArgs} args - Arguments to delete one Athlete.
     * @example
     * // Delete one Athlete
     * const Athlete = await prisma.athlete.delete({
     *   where: {
     *     // ... filter to delete one Athlete
     *   }
     * })
     * 
     */
    delete<T extends AthleteDeleteArgs>(args: SelectSubset<T, AthleteDeleteArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Athlete.
     * @param {AthleteUpdateArgs} args - Arguments to update one Athlete.
     * @example
     * // Update one Athlete
     * const athlete = await prisma.athlete.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AthleteUpdateArgs>(args: SelectSubset<T, AthleteUpdateArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Athletes.
     * @param {AthleteDeleteManyArgs} args - Arguments to filter Athletes to delete.
     * @example
     * // Delete a few Athletes
     * const { count } = await prisma.athlete.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AthleteDeleteManyArgs>(args?: SelectSubset<T, AthleteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Athletes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Athletes
     * const athlete = await prisma.athlete.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AthleteUpdateManyArgs>(args: SelectSubset<T, AthleteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Athletes and returns the data updated in the database.
     * @param {AthleteUpdateManyAndReturnArgs} args - Arguments to update many Athletes.
     * @example
     * // Update many Athletes
     * const athlete = await prisma.athlete.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Athletes and only return the `id`
     * const athleteWithIdOnly = await prisma.athlete.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AthleteUpdateManyAndReturnArgs>(args: SelectSubset<T, AthleteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Athlete.
     * @param {AthleteUpsertArgs} args - Arguments to update or create a Athlete.
     * @example
     * // Update or create a Athlete
     * const athlete = await prisma.athlete.upsert({
     *   create: {
     *     // ... data to create a Athlete
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Athlete we want to update
     *   }
     * })
     */
    upsert<T extends AthleteUpsertArgs>(args: SelectSubset<T, AthleteUpsertArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Athletes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteCountArgs} args - Arguments to filter Athletes to count.
     * @example
     * // Count the number of Athletes
     * const count = await prisma.athlete.count({
     *   where: {
     *     // ... the filter for the Athletes we want to count
     *   }
     * })
    **/
    count<T extends AthleteCountArgs>(
      args?: Subset<T, AthleteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AthleteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Athlete.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AthleteAggregateArgs>(args: Subset<T, AthleteAggregateArgs>): Prisma.PrismaPromise<GetAthleteAggregateType<T>>

    /**
     * Group by Athlete.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AthleteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AthleteGroupByArgs['orderBy'] }
        : { orderBy?: AthleteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AthleteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAthleteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Athlete model
   */
  readonly fields: AthleteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Athlete.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AthleteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    academicRecords<T extends Athlete$academicRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Athlete$academicRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    healthRecords<T extends Athlete$healthRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Athlete$healthRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    notes<T extends Athlete$notesArgs<ExtArgs> = {}>(args?: Subset<T, Athlete$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Athlete model
   */ 
  interface AthleteFieldRefs {
    readonly id: FieldRef<"Athlete", 'String'>
    readonly teamId: FieldRef<"Athlete", 'String'>
    readonly name: FieldRef<"Athlete", 'String'>
    readonly jerseyNumber: FieldRef<"Athlete", 'Int'>
    readonly height: FieldRef<"Athlete", 'Float'>
    readonly weight: FieldRef<"Athlete", 'Float'>
    readonly classYear: FieldRef<"Athlete", 'String'>
    readonly sport: FieldRef<"Athlete", 'String'>
    readonly events: FieldRef<"Athlete", 'String[]'>
    readonly eventRecords: FieldRef<"Athlete", 'Json'>
    readonly gpa: FieldRef<"Athlete", 'Float'>
    readonly academicStanding: FieldRef<"Athlete", 'AcademicStanding'>
    readonly eligibilityYearsLeft: FieldRef<"Athlete", 'Float'>
    readonly recruitingStatus: FieldRef<"Athlete", 'String'>
    readonly contactInfo: FieldRef<"Athlete", 'String'>
    readonly transferProbability: FieldRef<"Athlete", 'Float'>
    readonly medicalStatus: FieldRef<"Athlete", 'MedicalStatus'>
    readonly complianceStatus: FieldRef<"Athlete", 'ComplianceStatus'>
    readonly riskFlag: FieldRef<"Athlete", 'RiskFlag'>
  }
    

  // Custom InputTypes
  /**
   * Athlete findUnique
   */
  export type AthleteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete findUniqueOrThrow
   */
  export type AthleteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete findFirst
   */
  export type AthleteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Athletes.
     */
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete findFirstOrThrow
   */
  export type AthleteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Athletes.
     */
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete findMany
   */
  export type AthleteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter, which Athletes to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete create
   */
  export type AthleteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * The data needed to create a Athlete.
     */
    data: XOR<AthleteCreateInput, AthleteUncheckedCreateInput>
  }

  /**
   * Athlete createMany
   */
  export type AthleteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Athletes.
     */
    data: AthleteCreateManyInput | AthleteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Athlete createManyAndReturn
   */
  export type AthleteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The data used to create many Athletes.
     */
    data: AthleteCreateManyInput | AthleteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Athlete update
   */
  export type AthleteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * The data needed to update a Athlete.
     */
    data: XOR<AthleteUpdateInput, AthleteUncheckedUpdateInput>
    /**
     * Choose, which Athlete to update.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete updateMany
   */
  export type AthleteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Athletes.
     */
    data: XOR<AthleteUpdateManyMutationInput, AthleteUncheckedUpdateManyInput>
    /**
     * Filter which Athletes to update
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to update.
     */
    limit?: number
  }

  /**
   * Athlete updateManyAndReturn
   */
  export type AthleteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The data used to update Athletes.
     */
    data: XOR<AthleteUpdateManyMutationInput, AthleteUncheckedUpdateManyInput>
    /**
     * Filter which Athletes to update
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Athlete upsert
   */
  export type AthleteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * The filter to search for the Athlete to update in case it exists.
     */
    where: AthleteWhereUniqueInput
    /**
     * In case the Athlete found by the `where` argument doesn't exist, create a new Athlete with this data.
     */
    create: XOR<AthleteCreateInput, AthleteUncheckedCreateInput>
    /**
     * In case the Athlete was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AthleteUpdateInput, AthleteUncheckedUpdateInput>
  }

  /**
   * Athlete delete
   */
  export type AthleteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    /**
     * Filter which Athlete to delete.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete deleteMany
   */
  export type AthleteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Athletes to delete
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to delete.
     */
    limit?: number
  }

  /**
   * Athlete.academicRecords
   */
  export type Athlete$academicRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    where?: AcademicRecordWhereInput
    orderBy?: AcademicRecordOrderByWithRelationInput | AcademicRecordOrderByWithRelationInput[]
    cursor?: AcademicRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AcademicRecordScalarFieldEnum | AcademicRecordScalarFieldEnum[]
  }

  /**
   * Athlete.healthRecords
   */
  export type Athlete$healthRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    where?: HealthRecordWhereInput
    orderBy?: HealthRecordOrderByWithRelationInput | HealthRecordOrderByWithRelationInput[]
    cursor?: HealthRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HealthRecordScalarFieldEnum | HealthRecordScalarFieldEnum[]
  }

  /**
   * Athlete.notes
   */
  export type Athlete$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Athlete without action
   */
  export type AthleteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
  }


  /**
   * Model AcademicRecord
   */

  export type AggregateAcademicRecord = {
    _count: AcademicRecordCountAggregateOutputType | null
    _avg: AcademicRecordAvgAggregateOutputType | null
    _sum: AcademicRecordSumAggregateOutputType | null
    _min: AcademicRecordMinAggregateOutputType | null
    _max: AcademicRecordMaxAggregateOutputType | null
  }

  export type AcademicRecordAvgAggregateOutputType = {
    finalScore: number | null
    termGpa: number | null
    attendancePercent: number | null
    tutoringHours: number | null
  }

  export type AcademicRecordSumAggregateOutputType = {
    finalScore: number | null
    termGpa: number | null
    attendancePercent: number | null
    tutoringHours: number | null
  }

  export type AcademicRecordMinAggregateOutputType = {
    id: string | null
    athleteId: string | null
    semester: string | null
    finalScore: number | null
    termGpa: number | null
    academicStanding: $Enums.AcademicStanding | null
    complianceStatus: $Enums.ComplianceStatus | null
    attendancePercent: number | null
    tutoringHours: number | null
    advisorNotes: string | null
    createdAt: Date | null
  }

  export type AcademicRecordMaxAggregateOutputType = {
    id: string | null
    athleteId: string | null
    semester: string | null
    finalScore: number | null
    termGpa: number | null
    academicStanding: $Enums.AcademicStanding | null
    complianceStatus: $Enums.ComplianceStatus | null
    attendancePercent: number | null
    tutoringHours: number | null
    advisorNotes: string | null
    createdAt: Date | null
  }

  export type AcademicRecordCountAggregateOutputType = {
    id: number
    athleteId: number
    semester: number
    finalScore: number
    termGpa: number
    academicStanding: number
    complianceStatus: number
    attendancePercent: number
    tutoringHours: number
    advisorNotes: number
    createdAt: number
    _all: number
  }


  export type AcademicRecordAvgAggregateInputType = {
    finalScore?: true
    termGpa?: true
    attendancePercent?: true
    tutoringHours?: true
  }

  export type AcademicRecordSumAggregateInputType = {
    finalScore?: true
    termGpa?: true
    attendancePercent?: true
    tutoringHours?: true
  }

  export type AcademicRecordMinAggregateInputType = {
    id?: true
    athleteId?: true
    semester?: true
    finalScore?: true
    termGpa?: true
    academicStanding?: true
    complianceStatus?: true
    attendancePercent?: true
    tutoringHours?: true
    advisorNotes?: true
    createdAt?: true
  }

  export type AcademicRecordMaxAggregateInputType = {
    id?: true
    athleteId?: true
    semester?: true
    finalScore?: true
    termGpa?: true
    academicStanding?: true
    complianceStatus?: true
    attendancePercent?: true
    tutoringHours?: true
    advisorNotes?: true
    createdAt?: true
  }

  export type AcademicRecordCountAggregateInputType = {
    id?: true
    athleteId?: true
    semester?: true
    finalScore?: true
    termGpa?: true
    academicStanding?: true
    complianceStatus?: true
    attendancePercent?: true
    tutoringHours?: true
    advisorNotes?: true
    createdAt?: true
    _all?: true
  }

  export type AcademicRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicRecord to aggregate.
     */
    where?: AcademicRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicRecords to fetch.
     */
    orderBy?: AcademicRecordOrderByWithRelationInput | AcademicRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicRecords
    **/
    _count?: true | AcademicRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademicRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademicRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicRecordMaxAggregateInputType
  }

  export type GetAcademicRecordAggregateType<T extends AcademicRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicRecord[P]>
      : GetScalarType<T[P], AggregateAcademicRecord[P]>
  }




  export type AcademicRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicRecordWhereInput
    orderBy?: AcademicRecordOrderByWithAggregationInput | AcademicRecordOrderByWithAggregationInput[]
    by: AcademicRecordScalarFieldEnum[] | AcademicRecordScalarFieldEnum
    having?: AcademicRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicRecordCountAggregateInputType | true
    _avg?: AcademicRecordAvgAggregateInputType
    _sum?: AcademicRecordSumAggregateInputType
    _min?: AcademicRecordMinAggregateInputType
    _max?: AcademicRecordMaxAggregateInputType
  }

  export type AcademicRecordGroupByOutputType = {
    id: string
    athleteId: string
    semester: string
    finalScore: number | null
    termGpa: number | null
    academicStanding: $Enums.AcademicStanding | null
    complianceStatus: $Enums.ComplianceStatus | null
    attendancePercent: number | null
    tutoringHours: number | null
    advisorNotes: string | null
    createdAt: Date
    _count: AcademicRecordCountAggregateOutputType | null
    _avg: AcademicRecordAvgAggregateOutputType | null
    _sum: AcademicRecordSumAggregateOutputType | null
    _min: AcademicRecordMinAggregateOutputType | null
    _max: AcademicRecordMaxAggregateOutputType | null
  }

  type GetAcademicRecordGroupByPayload<T extends AcademicRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicRecordGroupByOutputType[P]>
        }
      >
    >


  export type AcademicRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    semester?: boolean
    finalScore?: boolean
    termGpa?: boolean
    academicStanding?: boolean
    complianceStatus?: boolean
    attendancePercent?: boolean
    tutoringHours?: boolean
    advisorNotes?: boolean
    createdAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicRecord"]>

  export type AcademicRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    semester?: boolean
    finalScore?: boolean
    termGpa?: boolean
    academicStanding?: boolean
    complianceStatus?: boolean
    attendancePercent?: boolean
    tutoringHours?: boolean
    advisorNotes?: boolean
    createdAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicRecord"]>

  export type AcademicRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    semester?: boolean
    finalScore?: boolean
    termGpa?: boolean
    academicStanding?: boolean
    complianceStatus?: boolean
    attendancePercent?: boolean
    tutoringHours?: boolean
    advisorNotes?: boolean
    createdAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicRecord"]>

  export type AcademicRecordSelectScalar = {
    id?: boolean
    athleteId?: boolean
    semester?: boolean
    finalScore?: boolean
    termGpa?: boolean
    academicStanding?: boolean
    complianceStatus?: boolean
    attendancePercent?: boolean
    tutoringHours?: boolean
    advisorNotes?: boolean
    createdAt?: boolean
  }

  export type AcademicRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "athleteId" | "semester" | "finalScore" | "termGpa" | "academicStanding" | "complianceStatus" | "attendancePercent" | "tutoringHours" | "advisorNotes" | "createdAt", ExtArgs["result"]["academicRecord"]>
  export type AcademicRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }
  export type AcademicRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }
  export type AcademicRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }

  export type $AcademicRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicRecord"
    objects: {
      athlete: Prisma.$AthletePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      athleteId: string
      semester: string
      finalScore: number | null
      termGpa: number | null
      academicStanding: $Enums.AcademicStanding | null
      complianceStatus: $Enums.ComplianceStatus | null
      attendancePercent: number | null
      tutoringHours: number | null
      advisorNotes: string | null
      createdAt: Date
    }, ExtArgs["result"]["academicRecord"]>
    composites: {}
  }

  type AcademicRecordGetPayload<S extends boolean | null | undefined | AcademicRecordDefaultArgs> = $Result.GetResult<Prisma.$AcademicRecordPayload, S>

  type AcademicRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicRecordCountAggregateInputType | true
    }

  export interface AcademicRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicRecord'], meta: { name: 'AcademicRecord' } }
    /**
     * Find zero or one AcademicRecord that matches the filter.
     * @param {AcademicRecordFindUniqueArgs} args - Arguments to find a AcademicRecord
     * @example
     * // Get one AcademicRecord
     * const academicRecord = await prisma.academicRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicRecordFindUniqueArgs>(args: SelectSubset<T, AcademicRecordFindUniqueArgs<ExtArgs>>): Prisma__AcademicRecordClient<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AcademicRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicRecordFindUniqueOrThrowArgs} args - Arguments to find a AcademicRecord
     * @example
     * // Get one AcademicRecord
     * const academicRecord = await prisma.academicRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicRecordClient<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AcademicRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicRecordFindFirstArgs} args - Arguments to find a AcademicRecord
     * @example
     * // Get one AcademicRecord
     * const academicRecord = await prisma.academicRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicRecordFindFirstArgs>(args?: SelectSubset<T, AcademicRecordFindFirstArgs<ExtArgs>>): Prisma__AcademicRecordClient<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AcademicRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicRecordFindFirstOrThrowArgs} args - Arguments to find a AcademicRecord
     * @example
     * // Get one AcademicRecord
     * const academicRecord = await prisma.academicRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicRecordClient<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AcademicRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicRecords
     * const academicRecords = await prisma.academicRecord.findMany()
     * 
     * // Get first 10 AcademicRecords
     * const academicRecords = await prisma.academicRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicRecordWithIdOnly = await prisma.academicRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicRecordFindManyArgs>(args?: SelectSubset<T, AcademicRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AcademicRecord.
     * @param {AcademicRecordCreateArgs} args - Arguments to create a AcademicRecord.
     * @example
     * // Create one AcademicRecord
     * const AcademicRecord = await prisma.academicRecord.create({
     *   data: {
     *     // ... data to create a AcademicRecord
     *   }
     * })
     * 
     */
    create<T extends AcademicRecordCreateArgs>(args: SelectSubset<T, AcademicRecordCreateArgs<ExtArgs>>): Prisma__AcademicRecordClient<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AcademicRecords.
     * @param {AcademicRecordCreateManyArgs} args - Arguments to create many AcademicRecords.
     * @example
     * // Create many AcademicRecords
     * const academicRecord = await prisma.academicRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicRecordCreateManyArgs>(args?: SelectSubset<T, AcademicRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicRecords and returns the data saved in the database.
     * @param {AcademicRecordCreateManyAndReturnArgs} args - Arguments to create many AcademicRecords.
     * @example
     * // Create many AcademicRecords
     * const academicRecord = await prisma.academicRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicRecords and only return the `id`
     * const academicRecordWithIdOnly = await prisma.academicRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AcademicRecord.
     * @param {AcademicRecordDeleteArgs} args - Arguments to delete one AcademicRecord.
     * @example
     * // Delete one AcademicRecord
     * const AcademicRecord = await prisma.academicRecord.delete({
     *   where: {
     *     // ... filter to delete one AcademicRecord
     *   }
     * })
     * 
     */
    delete<T extends AcademicRecordDeleteArgs>(args: SelectSubset<T, AcademicRecordDeleteArgs<ExtArgs>>): Prisma__AcademicRecordClient<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AcademicRecord.
     * @param {AcademicRecordUpdateArgs} args - Arguments to update one AcademicRecord.
     * @example
     * // Update one AcademicRecord
     * const academicRecord = await prisma.academicRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicRecordUpdateArgs>(args: SelectSubset<T, AcademicRecordUpdateArgs<ExtArgs>>): Prisma__AcademicRecordClient<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AcademicRecords.
     * @param {AcademicRecordDeleteManyArgs} args - Arguments to filter AcademicRecords to delete.
     * @example
     * // Delete a few AcademicRecords
     * const { count } = await prisma.academicRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicRecordDeleteManyArgs>(args?: SelectSubset<T, AcademicRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicRecords
     * const academicRecord = await prisma.academicRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicRecordUpdateManyArgs>(args: SelectSubset<T, AcademicRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicRecords and returns the data updated in the database.
     * @param {AcademicRecordUpdateManyAndReturnArgs} args - Arguments to update many AcademicRecords.
     * @example
     * // Update many AcademicRecords
     * const academicRecord = await prisma.academicRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AcademicRecords and only return the `id`
     * const academicRecordWithIdOnly = await prisma.academicRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcademicRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, AcademicRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AcademicRecord.
     * @param {AcademicRecordUpsertArgs} args - Arguments to update or create a AcademicRecord.
     * @example
     * // Update or create a AcademicRecord
     * const academicRecord = await prisma.academicRecord.upsert({
     *   create: {
     *     // ... data to create a AcademicRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicRecord we want to update
     *   }
     * })
     */
    upsert<T extends AcademicRecordUpsertArgs>(args: SelectSubset<T, AcademicRecordUpsertArgs<ExtArgs>>): Prisma__AcademicRecordClient<$Result.GetResult<Prisma.$AcademicRecordPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AcademicRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicRecordCountArgs} args - Arguments to filter AcademicRecords to count.
     * @example
     * // Count the number of AcademicRecords
     * const count = await prisma.academicRecord.count({
     *   where: {
     *     // ... the filter for the AcademicRecords we want to count
     *   }
     * })
    **/
    count<T extends AcademicRecordCountArgs>(
      args?: Subset<T, AcademicRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcademicRecordAggregateArgs>(args: Subset<T, AcademicRecordAggregateArgs>): Prisma.PrismaPromise<GetAcademicRecordAggregateType<T>>

    /**
     * Group by AcademicRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcademicRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicRecordGroupByArgs['orderBy'] }
        : { orderBy?: AcademicRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcademicRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicRecord model
   */
  readonly fields: AcademicRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    athlete<T extends AthleteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AthleteDefaultArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicRecord model
   */ 
  interface AcademicRecordFieldRefs {
    readonly id: FieldRef<"AcademicRecord", 'String'>
    readonly athleteId: FieldRef<"AcademicRecord", 'String'>
    readonly semester: FieldRef<"AcademicRecord", 'String'>
    readonly finalScore: FieldRef<"AcademicRecord", 'Float'>
    readonly termGpa: FieldRef<"AcademicRecord", 'Float'>
    readonly academicStanding: FieldRef<"AcademicRecord", 'AcademicStanding'>
    readonly complianceStatus: FieldRef<"AcademicRecord", 'ComplianceStatus'>
    readonly attendancePercent: FieldRef<"AcademicRecord", 'Float'>
    readonly tutoringHours: FieldRef<"AcademicRecord", 'Float'>
    readonly advisorNotes: FieldRef<"AcademicRecord", 'String'>
    readonly createdAt: FieldRef<"AcademicRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcademicRecord findUnique
   */
  export type AcademicRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * Filter, which AcademicRecord to fetch.
     */
    where: AcademicRecordWhereUniqueInput
  }

  /**
   * AcademicRecord findUniqueOrThrow
   */
  export type AcademicRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * Filter, which AcademicRecord to fetch.
     */
    where: AcademicRecordWhereUniqueInput
  }

  /**
   * AcademicRecord findFirst
   */
  export type AcademicRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * Filter, which AcademicRecord to fetch.
     */
    where?: AcademicRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicRecords to fetch.
     */
    orderBy?: AcademicRecordOrderByWithRelationInput | AcademicRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicRecords.
     */
    cursor?: AcademicRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicRecords.
     */
    distinct?: AcademicRecordScalarFieldEnum | AcademicRecordScalarFieldEnum[]
  }

  /**
   * AcademicRecord findFirstOrThrow
   */
  export type AcademicRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * Filter, which AcademicRecord to fetch.
     */
    where?: AcademicRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicRecords to fetch.
     */
    orderBy?: AcademicRecordOrderByWithRelationInput | AcademicRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicRecords.
     */
    cursor?: AcademicRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicRecords.
     */
    distinct?: AcademicRecordScalarFieldEnum | AcademicRecordScalarFieldEnum[]
  }

  /**
   * AcademicRecord findMany
   */
  export type AcademicRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * Filter, which AcademicRecords to fetch.
     */
    where?: AcademicRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicRecords to fetch.
     */
    orderBy?: AcademicRecordOrderByWithRelationInput | AcademicRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicRecords.
     */
    cursor?: AcademicRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicRecords.
     */
    skip?: number
    distinct?: AcademicRecordScalarFieldEnum | AcademicRecordScalarFieldEnum[]
  }

  /**
   * AcademicRecord create
   */
  export type AcademicRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicRecord.
     */
    data: XOR<AcademicRecordCreateInput, AcademicRecordUncheckedCreateInput>
  }

  /**
   * AcademicRecord createMany
   */
  export type AcademicRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicRecords.
     */
    data: AcademicRecordCreateManyInput | AcademicRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicRecord createManyAndReturn
   */
  export type AcademicRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * The data used to create many AcademicRecords.
     */
    data: AcademicRecordCreateManyInput | AcademicRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicRecord update
   */
  export type AcademicRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicRecord.
     */
    data: XOR<AcademicRecordUpdateInput, AcademicRecordUncheckedUpdateInput>
    /**
     * Choose, which AcademicRecord to update.
     */
    where: AcademicRecordWhereUniqueInput
  }

  /**
   * AcademicRecord updateMany
   */
  export type AcademicRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicRecords.
     */
    data: XOR<AcademicRecordUpdateManyMutationInput, AcademicRecordUncheckedUpdateManyInput>
    /**
     * Filter which AcademicRecords to update
     */
    where?: AcademicRecordWhereInput
    /**
     * Limit how many AcademicRecords to update.
     */
    limit?: number
  }

  /**
   * AcademicRecord updateManyAndReturn
   */
  export type AcademicRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * The data used to update AcademicRecords.
     */
    data: XOR<AcademicRecordUpdateManyMutationInput, AcademicRecordUncheckedUpdateManyInput>
    /**
     * Filter which AcademicRecords to update
     */
    where?: AcademicRecordWhereInput
    /**
     * Limit how many AcademicRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicRecord upsert
   */
  export type AcademicRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicRecord to update in case it exists.
     */
    where: AcademicRecordWhereUniqueInput
    /**
     * In case the AcademicRecord found by the `where` argument doesn't exist, create a new AcademicRecord with this data.
     */
    create: XOR<AcademicRecordCreateInput, AcademicRecordUncheckedCreateInput>
    /**
     * In case the AcademicRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicRecordUpdateInput, AcademicRecordUncheckedUpdateInput>
  }

  /**
   * AcademicRecord delete
   */
  export type AcademicRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
    /**
     * Filter which AcademicRecord to delete.
     */
    where: AcademicRecordWhereUniqueInput
  }

  /**
   * AcademicRecord deleteMany
   */
  export type AcademicRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicRecords to delete
     */
    where?: AcademicRecordWhereInput
    /**
     * Limit how many AcademicRecords to delete.
     */
    limit?: number
  }

  /**
   * AcademicRecord without action
   */
  export type AcademicRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicRecord
     */
    select?: AcademicRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicRecord
     */
    omit?: AcademicRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicRecordInclude<ExtArgs> | null
  }


  /**
   * Model HealthRecord
   */

  export type AggregateHealthRecord = {
    _count: HealthRecordCountAggregateOutputType | null
    _avg: HealthRecordAvgAggregateOutputType | null
    _sum: HealthRecordSumAggregateOutputType | null
    _min: HealthRecordMinAggregateOutputType | null
    _max: HealthRecordMaxAggregateOutputType | null
  }

  export type HealthRecordAvgAggregateOutputType = {
    rehabSessions: number | null
    appointmentAttendance: number | null
  }

  export type HealthRecordSumAggregateOutputType = {
    rehabSessions: number | null
    appointmentAttendance: number | null
  }

  export type HealthRecordMinAggregateOutputType = {
    id: string | null
    athleteId: string | null
    injuryType: string | null
    injuryDate: Date | null
    status: $Enums.MedicalStatus | null
    rehabSessions: number | null
    appointmentAttendance: number | null
    notes: string | null
    createdAt: Date | null
  }

  export type HealthRecordMaxAggregateOutputType = {
    id: string | null
    athleteId: string | null
    injuryType: string | null
    injuryDate: Date | null
    status: $Enums.MedicalStatus | null
    rehabSessions: number | null
    appointmentAttendance: number | null
    notes: string | null
    createdAt: Date | null
  }

  export type HealthRecordCountAggregateOutputType = {
    id: number
    athleteId: number
    injuryType: number
    injuryDate: number
    status: number
    rehabSessions: number
    appointmentAttendance: number
    notes: number
    createdAt: number
    _all: number
  }


  export type HealthRecordAvgAggregateInputType = {
    rehabSessions?: true
    appointmentAttendance?: true
  }

  export type HealthRecordSumAggregateInputType = {
    rehabSessions?: true
    appointmentAttendance?: true
  }

  export type HealthRecordMinAggregateInputType = {
    id?: true
    athleteId?: true
    injuryType?: true
    injuryDate?: true
    status?: true
    rehabSessions?: true
    appointmentAttendance?: true
    notes?: true
    createdAt?: true
  }

  export type HealthRecordMaxAggregateInputType = {
    id?: true
    athleteId?: true
    injuryType?: true
    injuryDate?: true
    status?: true
    rehabSessions?: true
    appointmentAttendance?: true
    notes?: true
    createdAt?: true
  }

  export type HealthRecordCountAggregateInputType = {
    id?: true
    athleteId?: true
    injuryType?: true
    injuryDate?: true
    status?: true
    rehabSessions?: true
    appointmentAttendance?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type HealthRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthRecord to aggregate.
     */
    where?: HealthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthRecords to fetch.
     */
    orderBy?: HealthRecordOrderByWithRelationInput | HealthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HealthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HealthRecords
    **/
    _count?: true | HealthRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HealthRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HealthRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HealthRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HealthRecordMaxAggregateInputType
  }

  export type GetHealthRecordAggregateType<T extends HealthRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateHealthRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHealthRecord[P]>
      : GetScalarType<T[P], AggregateHealthRecord[P]>
  }




  export type HealthRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthRecordWhereInput
    orderBy?: HealthRecordOrderByWithAggregationInput | HealthRecordOrderByWithAggregationInput[]
    by: HealthRecordScalarFieldEnum[] | HealthRecordScalarFieldEnum
    having?: HealthRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HealthRecordCountAggregateInputType | true
    _avg?: HealthRecordAvgAggregateInputType
    _sum?: HealthRecordSumAggregateInputType
    _min?: HealthRecordMinAggregateInputType
    _max?: HealthRecordMaxAggregateInputType
  }

  export type HealthRecordGroupByOutputType = {
    id: string
    athleteId: string
    injuryType: string | null
    injuryDate: Date | null
    status: $Enums.MedicalStatus | null
    rehabSessions: number | null
    appointmentAttendance: number | null
    notes: string | null
    createdAt: Date
    _count: HealthRecordCountAggregateOutputType | null
    _avg: HealthRecordAvgAggregateOutputType | null
    _sum: HealthRecordSumAggregateOutputType | null
    _min: HealthRecordMinAggregateOutputType | null
    _max: HealthRecordMaxAggregateOutputType | null
  }

  type GetHealthRecordGroupByPayload<T extends HealthRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HealthRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HealthRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HealthRecordGroupByOutputType[P]>
            : GetScalarType<T[P], HealthRecordGroupByOutputType[P]>
        }
      >
    >


  export type HealthRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    injuryType?: boolean
    injuryDate?: boolean
    status?: boolean
    rehabSessions?: boolean
    appointmentAttendance?: boolean
    notes?: boolean
    createdAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthRecord"]>

  export type HealthRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    injuryType?: boolean
    injuryDate?: boolean
    status?: boolean
    rehabSessions?: boolean
    appointmentAttendance?: boolean
    notes?: boolean
    createdAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthRecord"]>

  export type HealthRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    injuryType?: boolean
    injuryDate?: boolean
    status?: boolean
    rehabSessions?: boolean
    appointmentAttendance?: boolean
    notes?: boolean
    createdAt?: boolean
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthRecord"]>

  export type HealthRecordSelectScalar = {
    id?: boolean
    athleteId?: boolean
    injuryType?: boolean
    injuryDate?: boolean
    status?: boolean
    rehabSessions?: boolean
    appointmentAttendance?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type HealthRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "athleteId" | "injuryType" | "injuryDate" | "status" | "rehabSessions" | "appointmentAttendance" | "notes" | "createdAt", ExtArgs["result"]["healthRecord"]>
  export type HealthRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }
  export type HealthRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }
  export type HealthRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | AthleteDefaultArgs<ExtArgs>
  }

  export type $HealthRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HealthRecord"
    objects: {
      athlete: Prisma.$AthletePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      athleteId: string
      injuryType: string | null
      injuryDate: Date | null
      status: $Enums.MedicalStatus | null
      rehabSessions: number | null
      appointmentAttendance: number | null
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["healthRecord"]>
    composites: {}
  }

  type HealthRecordGetPayload<S extends boolean | null | undefined | HealthRecordDefaultArgs> = $Result.GetResult<Prisma.$HealthRecordPayload, S>

  type HealthRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HealthRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HealthRecordCountAggregateInputType | true
    }

  export interface HealthRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HealthRecord'], meta: { name: 'HealthRecord' } }
    /**
     * Find zero or one HealthRecord that matches the filter.
     * @param {HealthRecordFindUniqueArgs} args - Arguments to find a HealthRecord
     * @example
     * // Get one HealthRecord
     * const healthRecord = await prisma.healthRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HealthRecordFindUniqueArgs>(args: SelectSubset<T, HealthRecordFindUniqueArgs<ExtArgs>>): Prisma__HealthRecordClient<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one HealthRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HealthRecordFindUniqueOrThrowArgs} args - Arguments to find a HealthRecord
     * @example
     * // Get one HealthRecord
     * const healthRecord = await prisma.healthRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HealthRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, HealthRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HealthRecordClient<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first HealthRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthRecordFindFirstArgs} args - Arguments to find a HealthRecord
     * @example
     * // Get one HealthRecord
     * const healthRecord = await prisma.healthRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HealthRecordFindFirstArgs>(args?: SelectSubset<T, HealthRecordFindFirstArgs<ExtArgs>>): Prisma__HealthRecordClient<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first HealthRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthRecordFindFirstOrThrowArgs} args - Arguments to find a HealthRecord
     * @example
     * // Get one HealthRecord
     * const healthRecord = await prisma.healthRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HealthRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, HealthRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__HealthRecordClient<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more HealthRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HealthRecords
     * const healthRecords = await prisma.healthRecord.findMany()
     * 
     * // Get first 10 HealthRecords
     * const healthRecords = await prisma.healthRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const healthRecordWithIdOnly = await prisma.healthRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HealthRecordFindManyArgs>(args?: SelectSubset<T, HealthRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a HealthRecord.
     * @param {HealthRecordCreateArgs} args - Arguments to create a HealthRecord.
     * @example
     * // Create one HealthRecord
     * const HealthRecord = await prisma.healthRecord.create({
     *   data: {
     *     // ... data to create a HealthRecord
     *   }
     * })
     * 
     */
    create<T extends HealthRecordCreateArgs>(args: SelectSubset<T, HealthRecordCreateArgs<ExtArgs>>): Prisma__HealthRecordClient<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many HealthRecords.
     * @param {HealthRecordCreateManyArgs} args - Arguments to create many HealthRecords.
     * @example
     * // Create many HealthRecords
     * const healthRecord = await prisma.healthRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HealthRecordCreateManyArgs>(args?: SelectSubset<T, HealthRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HealthRecords and returns the data saved in the database.
     * @param {HealthRecordCreateManyAndReturnArgs} args - Arguments to create many HealthRecords.
     * @example
     * // Create many HealthRecords
     * const healthRecord = await prisma.healthRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HealthRecords and only return the `id`
     * const healthRecordWithIdOnly = await prisma.healthRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HealthRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, HealthRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a HealthRecord.
     * @param {HealthRecordDeleteArgs} args - Arguments to delete one HealthRecord.
     * @example
     * // Delete one HealthRecord
     * const HealthRecord = await prisma.healthRecord.delete({
     *   where: {
     *     // ... filter to delete one HealthRecord
     *   }
     * })
     * 
     */
    delete<T extends HealthRecordDeleteArgs>(args: SelectSubset<T, HealthRecordDeleteArgs<ExtArgs>>): Prisma__HealthRecordClient<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one HealthRecord.
     * @param {HealthRecordUpdateArgs} args - Arguments to update one HealthRecord.
     * @example
     * // Update one HealthRecord
     * const healthRecord = await prisma.healthRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HealthRecordUpdateArgs>(args: SelectSubset<T, HealthRecordUpdateArgs<ExtArgs>>): Prisma__HealthRecordClient<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more HealthRecords.
     * @param {HealthRecordDeleteManyArgs} args - Arguments to filter HealthRecords to delete.
     * @example
     * // Delete a few HealthRecords
     * const { count } = await prisma.healthRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HealthRecordDeleteManyArgs>(args?: SelectSubset<T, HealthRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HealthRecords
     * const healthRecord = await prisma.healthRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HealthRecordUpdateManyArgs>(args: SelectSubset<T, HealthRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthRecords and returns the data updated in the database.
     * @param {HealthRecordUpdateManyAndReturnArgs} args - Arguments to update many HealthRecords.
     * @example
     * // Update many HealthRecords
     * const healthRecord = await prisma.healthRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HealthRecords and only return the `id`
     * const healthRecordWithIdOnly = await prisma.healthRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HealthRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, HealthRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one HealthRecord.
     * @param {HealthRecordUpsertArgs} args - Arguments to update or create a HealthRecord.
     * @example
     * // Update or create a HealthRecord
     * const healthRecord = await prisma.healthRecord.upsert({
     *   create: {
     *     // ... data to create a HealthRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HealthRecord we want to update
     *   }
     * })
     */
    upsert<T extends HealthRecordUpsertArgs>(args: SelectSubset<T, HealthRecordUpsertArgs<ExtArgs>>): Prisma__HealthRecordClient<$Result.GetResult<Prisma.$HealthRecordPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of HealthRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthRecordCountArgs} args - Arguments to filter HealthRecords to count.
     * @example
     * // Count the number of HealthRecords
     * const count = await prisma.healthRecord.count({
     *   where: {
     *     // ... the filter for the HealthRecords we want to count
     *   }
     * })
    **/
    count<T extends HealthRecordCountArgs>(
      args?: Subset<T, HealthRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HealthRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HealthRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HealthRecordAggregateArgs>(args: Subset<T, HealthRecordAggregateArgs>): Prisma.PrismaPromise<GetHealthRecordAggregateType<T>>

    /**
     * Group by HealthRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HealthRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HealthRecordGroupByArgs['orderBy'] }
        : { orderBy?: HealthRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HealthRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHealthRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HealthRecord model
   */
  readonly fields: HealthRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HealthRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HealthRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    athlete<T extends AthleteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AthleteDefaultArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HealthRecord model
   */ 
  interface HealthRecordFieldRefs {
    readonly id: FieldRef<"HealthRecord", 'String'>
    readonly athleteId: FieldRef<"HealthRecord", 'String'>
    readonly injuryType: FieldRef<"HealthRecord", 'String'>
    readonly injuryDate: FieldRef<"HealthRecord", 'DateTime'>
    readonly status: FieldRef<"HealthRecord", 'MedicalStatus'>
    readonly rehabSessions: FieldRef<"HealthRecord", 'Int'>
    readonly appointmentAttendance: FieldRef<"HealthRecord", 'Float'>
    readonly notes: FieldRef<"HealthRecord", 'String'>
    readonly createdAt: FieldRef<"HealthRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HealthRecord findUnique
   */
  export type HealthRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * Filter, which HealthRecord to fetch.
     */
    where: HealthRecordWhereUniqueInput
  }

  /**
   * HealthRecord findUniqueOrThrow
   */
  export type HealthRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * Filter, which HealthRecord to fetch.
     */
    where: HealthRecordWhereUniqueInput
  }

  /**
   * HealthRecord findFirst
   */
  export type HealthRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * Filter, which HealthRecord to fetch.
     */
    where?: HealthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthRecords to fetch.
     */
    orderBy?: HealthRecordOrderByWithRelationInput | HealthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthRecords.
     */
    cursor?: HealthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthRecords.
     */
    distinct?: HealthRecordScalarFieldEnum | HealthRecordScalarFieldEnum[]
  }

  /**
   * HealthRecord findFirstOrThrow
   */
  export type HealthRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * Filter, which HealthRecord to fetch.
     */
    where?: HealthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthRecords to fetch.
     */
    orderBy?: HealthRecordOrderByWithRelationInput | HealthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthRecords.
     */
    cursor?: HealthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthRecords.
     */
    distinct?: HealthRecordScalarFieldEnum | HealthRecordScalarFieldEnum[]
  }

  /**
   * HealthRecord findMany
   */
  export type HealthRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * Filter, which HealthRecords to fetch.
     */
    where?: HealthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthRecords to fetch.
     */
    orderBy?: HealthRecordOrderByWithRelationInput | HealthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HealthRecords.
     */
    cursor?: HealthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthRecords.
     */
    skip?: number
    distinct?: HealthRecordScalarFieldEnum | HealthRecordScalarFieldEnum[]
  }

  /**
   * HealthRecord create
   */
  export type HealthRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a HealthRecord.
     */
    data: XOR<HealthRecordCreateInput, HealthRecordUncheckedCreateInput>
  }

  /**
   * HealthRecord createMany
   */
  export type HealthRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HealthRecords.
     */
    data: HealthRecordCreateManyInput | HealthRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HealthRecord createManyAndReturn
   */
  export type HealthRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * The data used to create many HealthRecords.
     */
    data: HealthRecordCreateManyInput | HealthRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthRecord update
   */
  export type HealthRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a HealthRecord.
     */
    data: XOR<HealthRecordUpdateInput, HealthRecordUncheckedUpdateInput>
    /**
     * Choose, which HealthRecord to update.
     */
    where: HealthRecordWhereUniqueInput
  }

  /**
   * HealthRecord updateMany
   */
  export type HealthRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HealthRecords.
     */
    data: XOR<HealthRecordUpdateManyMutationInput, HealthRecordUncheckedUpdateManyInput>
    /**
     * Filter which HealthRecords to update
     */
    where?: HealthRecordWhereInput
    /**
     * Limit how many HealthRecords to update.
     */
    limit?: number
  }

  /**
   * HealthRecord updateManyAndReturn
   */
  export type HealthRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * The data used to update HealthRecords.
     */
    data: XOR<HealthRecordUpdateManyMutationInput, HealthRecordUncheckedUpdateManyInput>
    /**
     * Filter which HealthRecords to update
     */
    where?: HealthRecordWhereInput
    /**
     * Limit how many HealthRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthRecord upsert
   */
  export type HealthRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the HealthRecord to update in case it exists.
     */
    where: HealthRecordWhereUniqueInput
    /**
     * In case the HealthRecord found by the `where` argument doesn't exist, create a new HealthRecord with this data.
     */
    create: XOR<HealthRecordCreateInput, HealthRecordUncheckedCreateInput>
    /**
     * In case the HealthRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HealthRecordUpdateInput, HealthRecordUncheckedUpdateInput>
  }

  /**
   * HealthRecord delete
   */
  export type HealthRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
    /**
     * Filter which HealthRecord to delete.
     */
    where: HealthRecordWhereUniqueInput
  }

  /**
   * HealthRecord deleteMany
   */
  export type HealthRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthRecords to delete
     */
    where?: HealthRecordWhereInput
    /**
     * Limit how many HealthRecords to delete.
     */
    limit?: number
  }

  /**
   * HealthRecord without action
   */
  export type HealthRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthRecord
     */
    select?: HealthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthRecord
     */
    omit?: HealthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthRecordInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    type: $Enums.EventType | null
    title: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    opponent: string | null
    group: $Enums.EventGroup | null
    createdByUserId: string | null
    createdAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    type: $Enums.EventType | null
    title: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    opponent: string | null
    group: $Enums.EventGroup | null
    createdByUserId: string | null
    createdAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    teamId: number
    type: number
    title: number
    description: number
    startTime: number
    endTime: number
    location: number
    opponent: number
    group: number
    createdByUserId: number
    createdAt: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    teamId?: true
    type?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    location?: true
    opponent?: true
    group?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    teamId?: true
    type?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    location?: true
    opponent?: true
    group?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    teamId?: true
    type?: true
    title?: true
    description?: true
    startTime?: true
    endTime?: true
    location?: true
    opponent?: true
    group?: true
    createdByUserId?: true
    createdAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    teamId: string
    type: $Enums.EventType
    title: string
    description: string | null
    startTime: Date
    endTime: Date
    location: string | null
    opponent: string | null
    group: $Enums.EventGroup
    createdByUserId: string | null
    createdAt: Date
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    opponent?: boolean
    group?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    opponent?: boolean
    group?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    opponent?: boolean
    group?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    teamId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    opponent?: boolean
    group?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "type" | "title" | "description" | "startTime" | "endTime" | "location" | "opponent" | "group" | "createdByUserId" | "createdAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      type: $Enums.EventType
      title: string
      description: string | null
      startTime: Date
      endTime: Date
      location: string | null
      opponent: string | null
      group: $Enums.EventGroup
      createdByUserId: string | null
      createdAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */ 
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly teamId: FieldRef<"Event", 'String'>
    readonly type: FieldRef<"Event", 'EventType'>
    readonly title: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly startTime: FieldRef<"Event", 'DateTime'>
    readonly endTime: FieldRef<"Event", 'DateTime'>
    readonly location: FieldRef<"Event", 'String'>
    readonly opponent: FieldRef<"Event", 'String'>
    readonly group: FieldRef<"Event", 'EventGroup'>
    readonly createdByUserId: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  export type NoteMinAggregateOutputType = {
    id: string | null
    athleteId: string | null
    userId: string | null
    category: $Enums.NoteCategory | null
    body: string | null
    createdAt: Date | null
  }

  export type NoteMaxAggregateOutputType = {
    id: string | null
    athleteId: string | null
    userId: string | null
    category: $Enums.NoteCategory | null
    body: string | null
    createdAt: Date | null
  }

  export type NoteCountAggregateOutputType = {
    id: number
    athleteId: number
    userId: number
    category: number
    body: number
    createdAt: number
    _all: number
  }


  export type NoteMinAggregateInputType = {
    id?: true
    athleteId?: true
    userId?: true
    category?: true
    body?: true
    createdAt?: true
  }

  export type NoteMaxAggregateInputType = {
    id?: true
    athleteId?: true
    userId?: true
    category?: true
    body?: true
    createdAt?: true
  }

  export type NoteCountAggregateInputType = {
    id?: true
    athleteId?: true
    userId?: true
    category?: true
    body?: true
    createdAt?: true
    _all?: true
  }

  export type NoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Note to aggregate.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notes
    **/
    _count?: true | NoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteMaxAggregateInputType
  }

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
        [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>
  }




  export type NoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithAggregationInput | NoteOrderByWithAggregationInput[]
    by: NoteScalarFieldEnum[] | NoteScalarFieldEnum
    having?: NoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteCountAggregateInputType | true
    _min?: NoteMinAggregateInputType
    _max?: NoteMaxAggregateInputType
  }

  export type NoteGroupByOutputType = {
    id: string
    athleteId: string | null
    userId: string
    category: $Enums.NoteCategory
    body: string
    createdAt: Date
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteGroupByOutputType[P]>
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
        }
      >
    >


  export type NoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    userId?: boolean
    category?: boolean
    body?: boolean
    createdAt?: boolean
    athlete?: boolean | Note$athleteArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    userId?: boolean
    category?: boolean
    body?: boolean
    createdAt?: boolean
    athlete?: boolean | Note$athleteArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    athleteId?: boolean
    userId?: boolean
    category?: boolean
    body?: boolean
    createdAt?: boolean
    athlete?: boolean | Note$athleteArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectScalar = {
    id?: boolean
    athleteId?: boolean
    userId?: boolean
    category?: boolean
    body?: boolean
    createdAt?: boolean
  }

  export type NoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "athleteId" | "userId" | "category" | "body" | "createdAt", ExtArgs["result"]["note"]>
  export type NoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | Note$athleteArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | Note$athleteArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    athlete?: boolean | Note$athleteArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Note"
    objects: {
      athlete: Prisma.$AthletePayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      athleteId: string | null
      userId: string
      category: $Enums.NoteCategory
      body: string
      createdAt: Date
    }, ExtArgs["result"]["note"]>
    composites: {}
  }

  type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = $Result.GetResult<Prisma.$NotePayload, S>

  type NoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoteCountAggregateInputType | true
    }

  export interface NoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Note'], meta: { name: 'Note' } }
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteFindUniqueArgs>(args: SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Note that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteFindUniqueOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteFindFirstArgs>(args?: SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Note that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteFindManyArgs>(args?: SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     * 
     */
    create<T extends NoteCreateArgs>(args: SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Notes.
     * @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteCreateManyArgs>(args?: SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notes and returns the data saved in the database.
     * @param {NoteCreateManyAndReturnArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     * 
     */
    delete<T extends NoteDeleteArgs>(args: SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteUpdateArgs>(args: SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteDeleteManyArgs>(args?: SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteUpdateManyArgs>(args: SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes and returns the data updated in the database.
     * @param {NoteUpdateManyAndReturnArgs} args - Arguments to update many Notes.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NoteUpdateManyAndReturnArgs>(args: SelectSubset<T, NoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     */
    upsert<T extends NoteUpsertArgs>(args: SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoteAggregateArgs>(args: Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs['orderBy'] }
        : { orderBy?: NoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Note model
   */
  readonly fields: NoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    athlete<T extends Note$athleteArgs<ExtArgs> = {}>(args?: Subset<T, Note$athleteArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Note model
   */ 
  interface NoteFieldRefs {
    readonly id: FieldRef<"Note", 'String'>
    readonly athleteId: FieldRef<"Note", 'String'>
    readonly userId: FieldRef<"Note", 'String'>
    readonly category: FieldRef<"Note", 'NoteCategory'>
    readonly body: FieldRef<"Note", 'String'>
    readonly createdAt: FieldRef<"Note", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findUniqueOrThrow
   */
  export type NoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findFirstOrThrow
   */
  export type NoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findMany
   */
  export type NoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Notes to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note create
   */
  export type NoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Note.
     */
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>
  }

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Note createManyAndReturn
   */
  export type NoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note update
   */
  export type NoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Note.
     */
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
    /**
     * Choose, which Note to update.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
  }

  /**
   * Note updateManyAndReturn
   */
  export type NoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note upsert
   */
  export type NoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Note to update in case it exists.
     */
    where: NoteWhereUniqueInput
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     */
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
  }

  /**
   * Note delete
   */
  export type NoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter which Note to delete.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notes to delete
     */
    where?: NoteWhereInput
    /**
     * Limit how many Notes to delete.
     */
    limit?: number
  }

  /**
   * Note.athlete
   */
  export type Note$athleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AthleteInclude<ExtArgs> | null
    where?: AthleteWhereInput
  }

  /**
   * Note without action
   */
  export type NoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Note
     */
    omit?: NoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    teamId: 'teamId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sport: 'sport',
    institution: 'institution',
    createdAt: 'createdAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const AthleteScalarFieldEnum: {
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

  export type AthleteScalarFieldEnum = (typeof AthleteScalarFieldEnum)[keyof typeof AthleteScalarFieldEnum]


  export const AcademicRecordScalarFieldEnum: {
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

  export type AcademicRecordScalarFieldEnum = (typeof AcademicRecordScalarFieldEnum)[keyof typeof AcademicRecordScalarFieldEnum]


  export const HealthRecordScalarFieldEnum: {
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

  export type HealthRecordScalarFieldEnum = (typeof HealthRecordScalarFieldEnum)[keyof typeof HealthRecordScalarFieldEnum]


  export const EventScalarFieldEnum: {
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

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const NoteScalarFieldEnum: {
    id: 'id',
    athleteId: 'athleteId',
    userId: 'userId',
    category: 'category',
    body: 'body',
    createdAt: 'createdAt'
  };

  export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'AcademicStanding'
   */
  export type EnumAcademicStandingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicStanding'>
    


  /**
   * Reference to a field of type 'AcademicStanding[]'
   */
  export type ListEnumAcademicStandingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AcademicStanding[]'>
    


  /**
   * Reference to a field of type 'MedicalStatus'
   */
  export type EnumMedicalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MedicalStatus'>
    


  /**
   * Reference to a field of type 'MedicalStatus[]'
   */
  export type ListEnumMedicalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MedicalStatus[]'>
    


  /**
   * Reference to a field of type 'ComplianceStatus'
   */
  export type EnumComplianceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplianceStatus'>
    


  /**
   * Reference to a field of type 'ComplianceStatus[]'
   */
  export type ListEnumComplianceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComplianceStatus[]'>
    


  /**
   * Reference to a field of type 'RiskFlag'
   */
  export type EnumRiskFlagFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskFlag'>
    


  /**
   * Reference to a field of type 'RiskFlag[]'
   */
  export type ListEnumRiskFlagFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskFlag[]'>
    


  /**
   * Reference to a field of type 'EventType'
   */
  export type EnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType'>
    


  /**
   * Reference to a field of type 'EventType[]'
   */
  export type ListEnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType[]'>
    


  /**
   * Reference to a field of type 'EventGroup'
   */
  export type EnumEventGroupFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventGroup'>
    


  /**
   * Reference to a field of type 'EventGroup[]'
   */
  export type ListEnumEventGroupFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventGroup[]'>
    


  /**
   * Reference to a field of type 'NoteCategory'
   */
  export type EnumNoteCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoteCategory'>
    


  /**
   * Reference to a field of type 'NoteCategory[]'
   */
  export type ListEnumNoteCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoteCategory[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    teamId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    notes?: NoteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    teamId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    notes?: NoteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    teamId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    team?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
    notes?: NoteListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    teamId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    teamId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    sport?: StringFilter<"Team"> | string
    institution?: StringNullableFilter<"Team"> | string | null
    createdAt?: DateTimeFilter<"Team"> | Date | string
    users?: UserListRelationFilter
    athletes?: AthleteListRelationFilter
    events?: EventListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sport?: SortOrder
    institution?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    athletes?: AthleteOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    name?: StringFilter<"Team"> | string
    sport?: StringFilter<"Team"> | string
    institution?: StringNullableFilter<"Team"> | string | null
    createdAt?: DateTimeFilter<"Team"> | Date | string
    users?: UserListRelationFilter
    athletes?: AthleteListRelationFilter
    events?: EventListRelationFilter
  }, "id">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sport?: SortOrder
    institution?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    sport?: StringWithAggregatesFilter<"Team"> | string
    institution?: StringNullableWithAggregatesFilter<"Team"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type AthleteWhereInput = {
    AND?: AthleteWhereInput | AthleteWhereInput[]
    OR?: AthleteWhereInput[]
    NOT?: AthleteWhereInput | AthleteWhereInput[]
    id?: StringFilter<"Athlete"> | string
    teamId?: StringFilter<"Athlete"> | string
    name?: StringFilter<"Athlete"> | string
    jerseyNumber?: IntNullableFilter<"Athlete"> | number | null
    height?: FloatNullableFilter<"Athlete"> | number | null
    weight?: FloatNullableFilter<"Athlete"> | number | null
    classYear?: StringNullableFilter<"Athlete"> | string | null
    sport?: StringNullableFilter<"Athlete"> | string | null
    events?: StringNullableListFilter<"Athlete">
    eventRecords?: JsonNullableFilter<"Athlete">
    gpa?: FloatNullableFilter<"Athlete"> | number | null
    academicStanding?: EnumAcademicStandingNullableFilter<"Athlete"> | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: FloatNullableFilter<"Athlete"> | number | null
    recruitingStatus?: StringNullableFilter<"Athlete"> | string | null
    contactInfo?: StringNullableFilter<"Athlete"> | string | null
    transferProbability?: FloatNullableFilter<"Athlete"> | number | null
    medicalStatus?: EnumMedicalStatusNullableFilter<"Athlete"> | $Enums.MedicalStatus | null
    complianceStatus?: EnumComplianceStatusNullableFilter<"Athlete"> | $Enums.ComplianceStatus | null
    riskFlag?: EnumRiskFlagNullableFilter<"Athlete"> | $Enums.RiskFlag | null
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    academicRecords?: AcademicRecordListRelationFilter
    healthRecords?: HealthRecordListRelationFilter
    notes?: NoteListRelationFilter
  }

  export type AthleteOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    name?: SortOrder
    jerseyNumber?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    classYear?: SortOrderInput | SortOrder
    sport?: SortOrderInput | SortOrder
    events?: SortOrder
    eventRecords?: SortOrderInput | SortOrder
    gpa?: SortOrderInput | SortOrder
    academicStanding?: SortOrderInput | SortOrder
    eligibilityYearsLeft?: SortOrderInput | SortOrder
    recruitingStatus?: SortOrderInput | SortOrder
    contactInfo?: SortOrderInput | SortOrder
    transferProbability?: SortOrderInput | SortOrder
    medicalStatus?: SortOrderInput | SortOrder
    complianceStatus?: SortOrderInput | SortOrder
    riskFlag?: SortOrderInput | SortOrder
    team?: TeamOrderByWithRelationInput
    academicRecords?: AcademicRecordOrderByRelationAggregateInput
    healthRecords?: HealthRecordOrderByRelationAggregateInput
    notes?: NoteOrderByRelationAggregateInput
  }

  export type AthleteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AthleteWhereInput | AthleteWhereInput[]
    OR?: AthleteWhereInput[]
    NOT?: AthleteWhereInput | AthleteWhereInput[]
    teamId?: StringFilter<"Athlete"> | string
    name?: StringFilter<"Athlete"> | string
    jerseyNumber?: IntNullableFilter<"Athlete"> | number | null
    height?: FloatNullableFilter<"Athlete"> | number | null
    weight?: FloatNullableFilter<"Athlete"> | number | null
    classYear?: StringNullableFilter<"Athlete"> | string | null
    sport?: StringNullableFilter<"Athlete"> | string | null
    events?: StringNullableListFilter<"Athlete">
    eventRecords?: JsonNullableFilter<"Athlete">
    gpa?: FloatNullableFilter<"Athlete"> | number | null
    academicStanding?: EnumAcademicStandingNullableFilter<"Athlete"> | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: FloatNullableFilter<"Athlete"> | number | null
    recruitingStatus?: StringNullableFilter<"Athlete"> | string | null
    contactInfo?: StringNullableFilter<"Athlete"> | string | null
    transferProbability?: FloatNullableFilter<"Athlete"> | number | null
    medicalStatus?: EnumMedicalStatusNullableFilter<"Athlete"> | $Enums.MedicalStatus | null
    complianceStatus?: EnumComplianceStatusNullableFilter<"Athlete"> | $Enums.ComplianceStatus | null
    riskFlag?: EnumRiskFlagNullableFilter<"Athlete"> | $Enums.RiskFlag | null
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    academicRecords?: AcademicRecordListRelationFilter
    healthRecords?: HealthRecordListRelationFilter
    notes?: NoteListRelationFilter
  }, "id">

  export type AthleteOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    name?: SortOrder
    jerseyNumber?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    classYear?: SortOrderInput | SortOrder
    sport?: SortOrderInput | SortOrder
    events?: SortOrder
    eventRecords?: SortOrderInput | SortOrder
    gpa?: SortOrderInput | SortOrder
    academicStanding?: SortOrderInput | SortOrder
    eligibilityYearsLeft?: SortOrderInput | SortOrder
    recruitingStatus?: SortOrderInput | SortOrder
    contactInfo?: SortOrderInput | SortOrder
    transferProbability?: SortOrderInput | SortOrder
    medicalStatus?: SortOrderInput | SortOrder
    complianceStatus?: SortOrderInput | SortOrder
    riskFlag?: SortOrderInput | SortOrder
    _count?: AthleteCountOrderByAggregateInput
    _avg?: AthleteAvgOrderByAggregateInput
    _max?: AthleteMaxOrderByAggregateInput
    _min?: AthleteMinOrderByAggregateInput
    _sum?: AthleteSumOrderByAggregateInput
  }

  export type AthleteScalarWhereWithAggregatesInput = {
    AND?: AthleteScalarWhereWithAggregatesInput | AthleteScalarWhereWithAggregatesInput[]
    OR?: AthleteScalarWhereWithAggregatesInput[]
    NOT?: AthleteScalarWhereWithAggregatesInput | AthleteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Athlete"> | string
    teamId?: StringWithAggregatesFilter<"Athlete"> | string
    name?: StringWithAggregatesFilter<"Athlete"> | string
    jerseyNumber?: IntNullableWithAggregatesFilter<"Athlete"> | number | null
    height?: FloatNullableWithAggregatesFilter<"Athlete"> | number | null
    weight?: FloatNullableWithAggregatesFilter<"Athlete"> | number | null
    classYear?: StringNullableWithAggregatesFilter<"Athlete"> | string | null
    sport?: StringNullableWithAggregatesFilter<"Athlete"> | string | null
    events?: StringNullableListFilter<"Athlete">
    eventRecords?: JsonNullableWithAggregatesFilter<"Athlete">
    gpa?: FloatNullableWithAggregatesFilter<"Athlete"> | number | null
    academicStanding?: EnumAcademicStandingNullableWithAggregatesFilter<"Athlete"> | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: FloatNullableWithAggregatesFilter<"Athlete"> | number | null
    recruitingStatus?: StringNullableWithAggregatesFilter<"Athlete"> | string | null
    contactInfo?: StringNullableWithAggregatesFilter<"Athlete"> | string | null
    transferProbability?: FloatNullableWithAggregatesFilter<"Athlete"> | number | null
    medicalStatus?: EnumMedicalStatusNullableWithAggregatesFilter<"Athlete"> | $Enums.MedicalStatus | null
    complianceStatus?: EnumComplianceStatusNullableWithAggregatesFilter<"Athlete"> | $Enums.ComplianceStatus | null
    riskFlag?: EnumRiskFlagNullableWithAggregatesFilter<"Athlete"> | $Enums.RiskFlag | null
  }

  export type AcademicRecordWhereInput = {
    AND?: AcademicRecordWhereInput | AcademicRecordWhereInput[]
    OR?: AcademicRecordWhereInput[]
    NOT?: AcademicRecordWhereInput | AcademicRecordWhereInput[]
    id?: StringFilter<"AcademicRecord"> | string
    athleteId?: StringFilter<"AcademicRecord"> | string
    semester?: StringFilter<"AcademicRecord"> | string
    finalScore?: FloatNullableFilter<"AcademicRecord"> | number | null
    termGpa?: FloatNullableFilter<"AcademicRecord"> | number | null
    academicStanding?: EnumAcademicStandingNullableFilter<"AcademicRecord"> | $Enums.AcademicStanding | null
    complianceStatus?: EnumComplianceStatusNullableFilter<"AcademicRecord"> | $Enums.ComplianceStatus | null
    attendancePercent?: FloatNullableFilter<"AcademicRecord"> | number | null
    tutoringHours?: FloatNullableFilter<"AcademicRecord"> | number | null
    advisorNotes?: StringNullableFilter<"AcademicRecord"> | string | null
    createdAt?: DateTimeFilter<"AcademicRecord"> | Date | string
    athlete?: XOR<AthleteScalarRelationFilter, AthleteWhereInput>
  }

  export type AcademicRecordOrderByWithRelationInput = {
    id?: SortOrder
    athleteId?: SortOrder
    semester?: SortOrder
    finalScore?: SortOrderInput | SortOrder
    termGpa?: SortOrderInput | SortOrder
    academicStanding?: SortOrderInput | SortOrder
    complianceStatus?: SortOrderInput | SortOrder
    attendancePercent?: SortOrderInput | SortOrder
    tutoringHours?: SortOrderInput | SortOrder
    advisorNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    athlete?: AthleteOrderByWithRelationInput
  }

  export type AcademicRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AcademicRecordWhereInput | AcademicRecordWhereInput[]
    OR?: AcademicRecordWhereInput[]
    NOT?: AcademicRecordWhereInput | AcademicRecordWhereInput[]
    athleteId?: StringFilter<"AcademicRecord"> | string
    semester?: StringFilter<"AcademicRecord"> | string
    finalScore?: FloatNullableFilter<"AcademicRecord"> | number | null
    termGpa?: FloatNullableFilter<"AcademicRecord"> | number | null
    academicStanding?: EnumAcademicStandingNullableFilter<"AcademicRecord"> | $Enums.AcademicStanding | null
    complianceStatus?: EnumComplianceStatusNullableFilter<"AcademicRecord"> | $Enums.ComplianceStatus | null
    attendancePercent?: FloatNullableFilter<"AcademicRecord"> | number | null
    tutoringHours?: FloatNullableFilter<"AcademicRecord"> | number | null
    advisorNotes?: StringNullableFilter<"AcademicRecord"> | string | null
    createdAt?: DateTimeFilter<"AcademicRecord"> | Date | string
    athlete?: XOR<AthleteScalarRelationFilter, AthleteWhereInput>
  }, "id">

  export type AcademicRecordOrderByWithAggregationInput = {
    id?: SortOrder
    athleteId?: SortOrder
    semester?: SortOrder
    finalScore?: SortOrderInput | SortOrder
    termGpa?: SortOrderInput | SortOrder
    academicStanding?: SortOrderInput | SortOrder
    complianceStatus?: SortOrderInput | SortOrder
    attendancePercent?: SortOrderInput | SortOrder
    tutoringHours?: SortOrderInput | SortOrder
    advisorNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AcademicRecordCountOrderByAggregateInput
    _avg?: AcademicRecordAvgOrderByAggregateInput
    _max?: AcademicRecordMaxOrderByAggregateInput
    _min?: AcademicRecordMinOrderByAggregateInput
    _sum?: AcademicRecordSumOrderByAggregateInput
  }

  export type AcademicRecordScalarWhereWithAggregatesInput = {
    AND?: AcademicRecordScalarWhereWithAggregatesInput | AcademicRecordScalarWhereWithAggregatesInput[]
    OR?: AcademicRecordScalarWhereWithAggregatesInput[]
    NOT?: AcademicRecordScalarWhereWithAggregatesInput | AcademicRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcademicRecord"> | string
    athleteId?: StringWithAggregatesFilter<"AcademicRecord"> | string
    semester?: StringWithAggregatesFilter<"AcademicRecord"> | string
    finalScore?: FloatNullableWithAggregatesFilter<"AcademicRecord"> | number | null
    termGpa?: FloatNullableWithAggregatesFilter<"AcademicRecord"> | number | null
    academicStanding?: EnumAcademicStandingNullableWithAggregatesFilter<"AcademicRecord"> | $Enums.AcademicStanding | null
    complianceStatus?: EnumComplianceStatusNullableWithAggregatesFilter<"AcademicRecord"> | $Enums.ComplianceStatus | null
    attendancePercent?: FloatNullableWithAggregatesFilter<"AcademicRecord"> | number | null
    tutoringHours?: FloatNullableWithAggregatesFilter<"AcademicRecord"> | number | null
    advisorNotes?: StringNullableWithAggregatesFilter<"AcademicRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AcademicRecord"> | Date | string
  }

  export type HealthRecordWhereInput = {
    AND?: HealthRecordWhereInput | HealthRecordWhereInput[]
    OR?: HealthRecordWhereInput[]
    NOT?: HealthRecordWhereInput | HealthRecordWhereInput[]
    id?: StringFilter<"HealthRecord"> | string
    athleteId?: StringFilter<"HealthRecord"> | string
    injuryType?: StringNullableFilter<"HealthRecord"> | string | null
    injuryDate?: DateTimeNullableFilter<"HealthRecord"> | Date | string | null
    status?: EnumMedicalStatusNullableFilter<"HealthRecord"> | $Enums.MedicalStatus | null
    rehabSessions?: IntNullableFilter<"HealthRecord"> | number | null
    appointmentAttendance?: FloatNullableFilter<"HealthRecord"> | number | null
    notes?: StringNullableFilter<"HealthRecord"> | string | null
    createdAt?: DateTimeFilter<"HealthRecord"> | Date | string
    athlete?: XOR<AthleteScalarRelationFilter, AthleteWhereInput>
  }

  export type HealthRecordOrderByWithRelationInput = {
    id?: SortOrder
    athleteId?: SortOrder
    injuryType?: SortOrderInput | SortOrder
    injuryDate?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    rehabSessions?: SortOrderInput | SortOrder
    appointmentAttendance?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    athlete?: AthleteOrderByWithRelationInput
  }

  export type HealthRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HealthRecordWhereInput | HealthRecordWhereInput[]
    OR?: HealthRecordWhereInput[]
    NOT?: HealthRecordWhereInput | HealthRecordWhereInput[]
    athleteId?: StringFilter<"HealthRecord"> | string
    injuryType?: StringNullableFilter<"HealthRecord"> | string | null
    injuryDate?: DateTimeNullableFilter<"HealthRecord"> | Date | string | null
    status?: EnumMedicalStatusNullableFilter<"HealthRecord"> | $Enums.MedicalStatus | null
    rehabSessions?: IntNullableFilter<"HealthRecord"> | number | null
    appointmentAttendance?: FloatNullableFilter<"HealthRecord"> | number | null
    notes?: StringNullableFilter<"HealthRecord"> | string | null
    createdAt?: DateTimeFilter<"HealthRecord"> | Date | string
    athlete?: XOR<AthleteScalarRelationFilter, AthleteWhereInput>
  }, "id">

  export type HealthRecordOrderByWithAggregationInput = {
    id?: SortOrder
    athleteId?: SortOrder
    injuryType?: SortOrderInput | SortOrder
    injuryDate?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    rehabSessions?: SortOrderInput | SortOrder
    appointmentAttendance?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: HealthRecordCountOrderByAggregateInput
    _avg?: HealthRecordAvgOrderByAggregateInput
    _max?: HealthRecordMaxOrderByAggregateInput
    _min?: HealthRecordMinOrderByAggregateInput
    _sum?: HealthRecordSumOrderByAggregateInput
  }

  export type HealthRecordScalarWhereWithAggregatesInput = {
    AND?: HealthRecordScalarWhereWithAggregatesInput | HealthRecordScalarWhereWithAggregatesInput[]
    OR?: HealthRecordScalarWhereWithAggregatesInput[]
    NOT?: HealthRecordScalarWhereWithAggregatesInput | HealthRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HealthRecord"> | string
    athleteId?: StringWithAggregatesFilter<"HealthRecord"> | string
    injuryType?: StringNullableWithAggregatesFilter<"HealthRecord"> | string | null
    injuryDate?: DateTimeNullableWithAggregatesFilter<"HealthRecord"> | Date | string | null
    status?: EnumMedicalStatusNullableWithAggregatesFilter<"HealthRecord"> | $Enums.MedicalStatus | null
    rehabSessions?: IntNullableWithAggregatesFilter<"HealthRecord"> | number | null
    appointmentAttendance?: FloatNullableWithAggregatesFilter<"HealthRecord"> | number | null
    notes?: StringNullableWithAggregatesFilter<"HealthRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HealthRecord"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    teamId?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    title?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    location?: StringNullableFilter<"Event"> | string | null
    opponent?: StringNullableFilter<"Event"> | string | null
    group?: EnumEventGroupFilter<"Event"> | $Enums.EventGroup
    createdByUserId?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrderInput | SortOrder
    opponent?: SortOrderInput | SortOrder
    group?: SortOrder
    createdByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    team?: TeamOrderByWithRelationInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    teamId?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    title?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    location?: StringNullableFilter<"Event"> | string | null
    opponent?: StringNullableFilter<"Event"> | string | null
    group?: EnumEventGroupFilter<"Event"> | $Enums.EventGroup
    createdByUserId?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrderInput | SortOrder
    opponent?: SortOrderInput | SortOrder
    group?: SortOrder
    createdByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    teamId?: StringWithAggregatesFilter<"Event"> | string
    type?: EnumEventTypeWithAggregatesFilter<"Event"> | $Enums.EventType
    title?: StringWithAggregatesFilter<"Event"> | string
    description?: StringNullableWithAggregatesFilter<"Event"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    location?: StringNullableWithAggregatesFilter<"Event"> | string | null
    opponent?: StringNullableWithAggregatesFilter<"Event"> | string | null
    group?: EnumEventGroupWithAggregatesFilter<"Event"> | $Enums.EventGroup
    createdByUserId?: StringNullableWithAggregatesFilter<"Event"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type NoteWhereInput = {
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    id?: StringFilter<"Note"> | string
    athleteId?: StringNullableFilter<"Note"> | string | null
    userId?: StringFilter<"Note"> | string
    category?: EnumNoteCategoryFilter<"Note"> | $Enums.NoteCategory
    body?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    athlete?: XOR<AthleteNullableScalarRelationFilter, AthleteWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder
    athleteId?: SortOrderInput | SortOrder
    userId?: SortOrder
    category?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    athlete?: AthleteOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    athleteId?: StringNullableFilter<"Note"> | string | null
    userId?: StringFilter<"Note"> | string
    category?: EnumNoteCategoryFilter<"Note"> | $Enums.NoteCategory
    body?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    athlete?: XOR<AthleteNullableScalarRelationFilter, AthleteWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder
    athleteId?: SortOrderInput | SortOrder
    userId?: SortOrder
    category?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    _count?: NoteCountOrderByAggregateInput
    _max?: NoteMaxOrderByAggregateInput
    _min?: NoteMinOrderByAggregateInput
  }

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    OR?: NoteScalarWhereWithAggregatesInput[]
    NOT?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Note"> | string
    athleteId?: StringNullableWithAggregatesFilter<"Note"> | string | null
    userId?: StringWithAggregatesFilter<"Note"> | string
    category?: EnumNoteCategoryWithAggregatesFilter<"Note"> | $Enums.NoteCategory
    body?: StringWithAggregatesFilter<"Note"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    team?: TeamCreateNestedOneWithoutUsersInput
    notes?: NoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    teamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneWithoutUsersNestedInput
    notes?: NoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    teamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTeamInput
    athletes?: AthleteCreateNestedManyWithoutTeamInput
    events?: EventCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTeamInput
    athletes?: AthleteUncheckedCreateNestedManyWithoutTeamInput
    events?: EventUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTeamNestedInput
    athletes?: AthleteUpdateManyWithoutTeamNestedInput
    events?: EventUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTeamNestedInput
    athletes?: AthleteUncheckedUpdateManyWithoutTeamNestedInput
    events?: EventUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteCreateInput = {
    id?: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    team: TeamCreateNestedOneWithoutAthletesInput
    academicRecords?: AcademicRecordCreateNestedManyWithoutAthleteInput
    healthRecords?: HealthRecordCreateNestedManyWithoutAthleteInput
    notes?: NoteCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateInput = {
    id?: string
    teamId: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUncheckedCreateNestedManyWithoutAthleteInput
    healthRecords?: HealthRecordUncheckedCreateNestedManyWithoutAthleteInput
    notes?: NoteUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    team?: TeamUpdateOneRequiredWithoutAthletesNestedInput
    academicRecords?: AcademicRecordUpdateManyWithoutAthleteNestedInput
    healthRecords?: HealthRecordUpdateManyWithoutAthleteNestedInput
    notes?: NoteUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUncheckedUpdateManyWithoutAthleteNestedInput
    healthRecords?: HealthRecordUncheckedUpdateManyWithoutAthleteNestedInput
    notes?: NoteUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteCreateManyInput = {
    id?: string
    teamId: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
  }

  export type AthleteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
  }

  export type AthleteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
  }

  export type AcademicRecordCreateInput = {
    id?: string
    semester: string
    finalScore?: number | null
    termGpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    complianceStatus?: $Enums.ComplianceStatus | null
    attendancePercent?: number | null
    tutoringHours?: number | null
    advisorNotes?: string | null
    createdAt?: Date | string
    athlete: AthleteCreateNestedOneWithoutAcademicRecordsInput
  }

  export type AcademicRecordUncheckedCreateInput = {
    id?: string
    athleteId: string
    semester: string
    finalScore?: number | null
    termGpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    complianceStatus?: $Enums.ComplianceStatus | null
    attendancePercent?: number | null
    tutoringHours?: number | null
    advisorNotes?: string | null
    createdAt?: Date | string
  }

  export type AcademicRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    finalScore?: NullableFloatFieldUpdateOperationsInput | number | null
    termGpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    attendancePercent?: NullableFloatFieldUpdateOperationsInput | number | null
    tutoringHours?: NullableFloatFieldUpdateOperationsInput | number | null
    advisorNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athlete?: AthleteUpdateOneRequiredWithoutAcademicRecordsNestedInput
  }

  export type AcademicRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    finalScore?: NullableFloatFieldUpdateOperationsInput | number | null
    termGpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    attendancePercent?: NullableFloatFieldUpdateOperationsInput | number | null
    tutoringHours?: NullableFloatFieldUpdateOperationsInput | number | null
    advisorNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicRecordCreateManyInput = {
    id?: string
    athleteId: string
    semester: string
    finalScore?: number | null
    termGpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    complianceStatus?: $Enums.ComplianceStatus | null
    attendancePercent?: number | null
    tutoringHours?: number | null
    advisorNotes?: string | null
    createdAt?: Date | string
  }

  export type AcademicRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    finalScore?: NullableFloatFieldUpdateOperationsInput | number | null
    termGpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    attendancePercent?: NullableFloatFieldUpdateOperationsInput | number | null
    tutoringHours?: NullableFloatFieldUpdateOperationsInput | number | null
    advisorNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    finalScore?: NullableFloatFieldUpdateOperationsInput | number | null
    termGpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    attendancePercent?: NullableFloatFieldUpdateOperationsInput | number | null
    tutoringHours?: NullableFloatFieldUpdateOperationsInput | number | null
    advisorNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthRecordCreateInput = {
    id?: string
    injuryType?: string | null
    injuryDate?: Date | string | null
    status?: $Enums.MedicalStatus | null
    rehabSessions?: number | null
    appointmentAttendance?: number | null
    notes?: string | null
    createdAt?: Date | string
    athlete: AthleteCreateNestedOneWithoutHealthRecordsInput
  }

  export type HealthRecordUncheckedCreateInput = {
    id?: string
    athleteId: string
    injuryType?: string | null
    injuryDate?: Date | string | null
    status?: $Enums.MedicalStatus | null
    rehabSessions?: number | null
    appointmentAttendance?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type HealthRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    injuryType?: NullableStringFieldUpdateOperationsInput | string | null
    injuryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    rehabSessions?: NullableIntFieldUpdateOperationsInput | number | null
    appointmentAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athlete?: AthleteUpdateOneRequiredWithoutHealthRecordsNestedInput
  }

  export type HealthRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: StringFieldUpdateOperationsInput | string
    injuryType?: NullableStringFieldUpdateOperationsInput | string | null
    injuryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    rehabSessions?: NullableIntFieldUpdateOperationsInput | number | null
    appointmentAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthRecordCreateManyInput = {
    id?: string
    athleteId: string
    injuryType?: string | null
    injuryDate?: Date | string | null
    status?: $Enums.MedicalStatus | null
    rehabSessions?: number | null
    appointmentAttendance?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type HealthRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    injuryType?: NullableStringFieldUpdateOperationsInput | string | null
    injuryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    rehabSessions?: NullableIntFieldUpdateOperationsInput | number | null
    appointmentAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: StringFieldUpdateOperationsInput | string
    injuryType?: NullableStringFieldUpdateOperationsInput | string | null
    injuryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    rehabSessions?: NullableIntFieldUpdateOperationsInput | number | null
    appointmentAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: string
    type: $Enums.EventType
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    opponent?: string | null
    group: $Enums.EventGroup
    createdByUserId?: string | null
    createdAt?: Date | string
    team: TeamCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    teamId: string
    type: $Enums.EventType
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    opponent?: string | null
    group: $Enums.EventGroup
    createdByUserId?: string | null
    createdAt?: Date | string
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    group?: EnumEventGroupFieldUpdateOperationsInput | $Enums.EventGroup
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    group?: EnumEventGroupFieldUpdateOperationsInput | $Enums.EventGroup
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateManyInput = {
    id?: string
    teamId: string
    type: $Enums.EventType
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    opponent?: string | null
    group: $Enums.EventGroup
    createdByUserId?: string | null
    createdAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    group?: EnumEventGroupFieldUpdateOperationsInput | $Enums.EventGroup
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    group?: EnumEventGroupFieldUpdateOperationsInput | $Enums.EventGroup
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateInput = {
    id?: string
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
    athlete?: AthleteCreateNestedOneWithoutNotesInput
    user: UserCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateInput = {
    id?: string
    athleteId?: string | null
    userId: string
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
  }

  export type NoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athlete?: AthleteUpdateOneWithoutNotesNestedInput
    user?: UserUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateManyInput = {
    id?: string
    athleteId?: string | null
    userId: string
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
  }

  export type NoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TeamNullableScalarRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type NoteListRelationFilter = {
    every?: NoteWhereInput
    some?: NoteWhereInput
    none?: NoteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type AthleteListRelationFilter = {
    every?: AthleteWhereInput
    some?: AthleteWhereInput
    none?: AthleteWhereInput
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AthleteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sport?: SortOrder
    institution?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sport?: SortOrder
    institution?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sport?: SortOrder
    institution?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumAcademicStandingNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicStanding | EnumAcademicStandingFieldRefInput<$PrismaModel> | null
    in?: $Enums.AcademicStanding[] | ListEnumAcademicStandingFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AcademicStanding[] | ListEnumAcademicStandingFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAcademicStandingNullableFilter<$PrismaModel> | $Enums.AcademicStanding | null
  }

  export type EnumMedicalStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MedicalStatus | EnumMedicalStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.MedicalStatus[] | ListEnumMedicalStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MedicalStatus[] | ListEnumMedicalStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMedicalStatusNullableFilter<$PrismaModel> | $Enums.MedicalStatus | null
  }

  export type EnumComplianceStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplianceStatus | EnumComplianceStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ComplianceStatus[] | ListEnumComplianceStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ComplianceStatus[] | ListEnumComplianceStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumComplianceStatusNullableFilter<$PrismaModel> | $Enums.ComplianceStatus | null
  }

  export type EnumRiskFlagNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskFlag | EnumRiskFlagFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiskFlag[] | ListEnumRiskFlagFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiskFlag[] | ListEnumRiskFlagFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiskFlagNullableFilter<$PrismaModel> | $Enums.RiskFlag | null
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type AcademicRecordListRelationFilter = {
    every?: AcademicRecordWhereInput
    some?: AcademicRecordWhereInput
    none?: AcademicRecordWhereInput
  }

  export type HealthRecordListRelationFilter = {
    every?: HealthRecordWhereInput
    some?: HealthRecordWhereInput
    none?: HealthRecordWhereInput
  }

  export type AcademicRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HealthRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AthleteCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    name?: SortOrder
    jerseyNumber?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    classYear?: SortOrder
    sport?: SortOrder
    events?: SortOrder
    eventRecords?: SortOrder
    gpa?: SortOrder
    academicStanding?: SortOrder
    eligibilityYearsLeft?: SortOrder
    recruitingStatus?: SortOrder
    contactInfo?: SortOrder
    transferProbability?: SortOrder
    medicalStatus?: SortOrder
    complianceStatus?: SortOrder
    riskFlag?: SortOrder
  }

  export type AthleteAvgOrderByAggregateInput = {
    jerseyNumber?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    gpa?: SortOrder
    eligibilityYearsLeft?: SortOrder
    transferProbability?: SortOrder
  }

  export type AthleteMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    name?: SortOrder
    jerseyNumber?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    classYear?: SortOrder
    sport?: SortOrder
    gpa?: SortOrder
    academicStanding?: SortOrder
    eligibilityYearsLeft?: SortOrder
    recruitingStatus?: SortOrder
    contactInfo?: SortOrder
    transferProbability?: SortOrder
    medicalStatus?: SortOrder
    complianceStatus?: SortOrder
    riskFlag?: SortOrder
  }

  export type AthleteMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    name?: SortOrder
    jerseyNumber?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    classYear?: SortOrder
    sport?: SortOrder
    gpa?: SortOrder
    academicStanding?: SortOrder
    eligibilityYearsLeft?: SortOrder
    recruitingStatus?: SortOrder
    contactInfo?: SortOrder
    transferProbability?: SortOrder
    medicalStatus?: SortOrder
    complianceStatus?: SortOrder
    riskFlag?: SortOrder
  }

  export type AthleteSumOrderByAggregateInput = {
    jerseyNumber?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    gpa?: SortOrder
    eligibilityYearsLeft?: SortOrder
    transferProbability?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumAcademicStandingNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicStanding | EnumAcademicStandingFieldRefInput<$PrismaModel> | null
    in?: $Enums.AcademicStanding[] | ListEnumAcademicStandingFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AcademicStanding[] | ListEnumAcademicStandingFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAcademicStandingNullableWithAggregatesFilter<$PrismaModel> | $Enums.AcademicStanding | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAcademicStandingNullableFilter<$PrismaModel>
    _max?: NestedEnumAcademicStandingNullableFilter<$PrismaModel>
  }

  export type EnumMedicalStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MedicalStatus | EnumMedicalStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.MedicalStatus[] | ListEnumMedicalStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MedicalStatus[] | ListEnumMedicalStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMedicalStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.MedicalStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMedicalStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumMedicalStatusNullableFilter<$PrismaModel>
  }

  export type EnumComplianceStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplianceStatus | EnumComplianceStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ComplianceStatus[] | ListEnumComplianceStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ComplianceStatus[] | ListEnumComplianceStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumComplianceStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ComplianceStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumComplianceStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumComplianceStatusNullableFilter<$PrismaModel>
  }

  export type EnumRiskFlagNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskFlag | EnumRiskFlagFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiskFlag[] | ListEnumRiskFlagFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiskFlag[] | ListEnumRiskFlagFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiskFlagNullableWithAggregatesFilter<$PrismaModel> | $Enums.RiskFlag | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRiskFlagNullableFilter<$PrismaModel>
    _max?: NestedEnumRiskFlagNullableFilter<$PrismaModel>
  }

  export type AthleteScalarRelationFilter = {
    is?: AthleteWhereInput
    isNot?: AthleteWhereInput
  }

  export type AcademicRecordCountOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    semester?: SortOrder
    finalScore?: SortOrder
    termGpa?: SortOrder
    academicStanding?: SortOrder
    complianceStatus?: SortOrder
    attendancePercent?: SortOrder
    tutoringHours?: SortOrder
    advisorNotes?: SortOrder
    createdAt?: SortOrder
  }

  export type AcademicRecordAvgOrderByAggregateInput = {
    finalScore?: SortOrder
    termGpa?: SortOrder
    attendancePercent?: SortOrder
    tutoringHours?: SortOrder
  }

  export type AcademicRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    semester?: SortOrder
    finalScore?: SortOrder
    termGpa?: SortOrder
    academicStanding?: SortOrder
    complianceStatus?: SortOrder
    attendancePercent?: SortOrder
    tutoringHours?: SortOrder
    advisorNotes?: SortOrder
    createdAt?: SortOrder
  }

  export type AcademicRecordMinOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    semester?: SortOrder
    finalScore?: SortOrder
    termGpa?: SortOrder
    academicStanding?: SortOrder
    complianceStatus?: SortOrder
    attendancePercent?: SortOrder
    tutoringHours?: SortOrder
    advisorNotes?: SortOrder
    createdAt?: SortOrder
  }

  export type AcademicRecordSumOrderByAggregateInput = {
    finalScore?: SortOrder
    termGpa?: SortOrder
    attendancePercent?: SortOrder
    tutoringHours?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type HealthRecordCountOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    injuryType?: SortOrder
    injuryDate?: SortOrder
    status?: SortOrder
    rehabSessions?: SortOrder
    appointmentAttendance?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type HealthRecordAvgOrderByAggregateInput = {
    rehabSessions?: SortOrder
    appointmentAttendance?: SortOrder
  }

  export type HealthRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    injuryType?: SortOrder
    injuryDate?: SortOrder
    status?: SortOrder
    rehabSessions?: SortOrder
    appointmentAttendance?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type HealthRecordMinOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    injuryType?: SortOrder
    injuryDate?: SortOrder
    status?: SortOrder
    rehabSessions?: SortOrder
    appointmentAttendance?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type HealthRecordSumOrderByAggregateInput = {
    rehabSessions?: SortOrder
    appointmentAttendance?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type EnumEventGroupFilter<$PrismaModel = never> = {
    equals?: $Enums.EventGroup | EnumEventGroupFieldRefInput<$PrismaModel>
    in?: $Enums.EventGroup[] | ListEnumEventGroupFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventGroup[] | ListEnumEventGroupFieldRefInput<$PrismaModel>
    not?: NestedEnumEventGroupFilter<$PrismaModel> | $Enums.EventGroup
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    opponent?: SortOrder
    group?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    opponent?: SortOrder
    group?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    opponent?: SortOrder
    group?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type EnumEventGroupWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventGroup | EnumEventGroupFieldRefInput<$PrismaModel>
    in?: $Enums.EventGroup[] | ListEnumEventGroupFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventGroup[] | ListEnumEventGroupFieldRefInput<$PrismaModel>
    not?: NestedEnumEventGroupWithAggregatesFilter<$PrismaModel> | $Enums.EventGroup
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventGroupFilter<$PrismaModel>
    _max?: NestedEnumEventGroupFilter<$PrismaModel>
  }

  export type EnumNoteCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.NoteCategory | EnumNoteCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.NoteCategory[] | ListEnumNoteCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.NoteCategory[] | ListEnumNoteCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumNoteCategoryFilter<$PrismaModel> | $Enums.NoteCategory
  }

  export type AthleteNullableScalarRelationFilter = {
    is?: AthleteWhereInput | null
    isNot?: AthleteWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
  }

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
  }

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder
    athleteId?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNoteCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NoteCategory | EnumNoteCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.NoteCategory[] | ListEnumNoteCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.NoteCategory[] | ListEnumNoteCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumNoteCategoryWithAggregatesFilter<$PrismaModel> | $Enums.NoteCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNoteCategoryFilter<$PrismaModel>
    _max?: NestedEnumNoteCategoryFilter<$PrismaModel>
  }

  export type TeamCreateNestedOneWithoutUsersInput = {
    create?: XOR<TeamCreateWithoutUsersInput, TeamUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutUsersInput
    connect?: TeamWhereUniqueInput
  }

  export type NoteCreateNestedManyWithoutUserInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TeamUpdateOneWithoutUsersNestedInput = {
    create?: XOR<TeamCreateWithoutUsersInput, TeamUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutUsersInput
    upsert?: TeamUpsertWithoutUsersInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutUsersInput, TeamUpdateWithoutUsersInput>, TeamUncheckedUpdateWithoutUsersInput>
  }

  export type NoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutUserInput | NoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutUserInput | NoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutUserInput | NoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutUserInput | NoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutUserInput | NoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutUserInput | NoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutTeamInput = {
    create?: XOR<UserCreateWithoutTeamInput, UserUncheckedCreateWithoutTeamInput> | UserCreateWithoutTeamInput[] | UserUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTeamInput | UserCreateOrConnectWithoutTeamInput[]
    createMany?: UserCreateManyTeamInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AthleteCreateNestedManyWithoutTeamInput = {
    create?: XOR<AthleteCreateWithoutTeamInput, AthleteUncheckedCreateWithoutTeamInput> | AthleteCreateWithoutTeamInput[] | AthleteUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: AthleteCreateOrConnectWithoutTeamInput | AthleteCreateOrConnectWithoutTeamInput[]
    createMany?: AthleteCreateManyTeamInputEnvelope
    connect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutTeamInput = {
    create?: XOR<EventCreateWithoutTeamInput, EventUncheckedCreateWithoutTeamInput> | EventCreateWithoutTeamInput[] | EventUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTeamInput | EventCreateOrConnectWithoutTeamInput[]
    createMany?: EventCreateManyTeamInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<UserCreateWithoutTeamInput, UserUncheckedCreateWithoutTeamInput> | UserCreateWithoutTeamInput[] | UserUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTeamInput | UserCreateOrConnectWithoutTeamInput[]
    createMany?: UserCreateManyTeamInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AthleteUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<AthleteCreateWithoutTeamInput, AthleteUncheckedCreateWithoutTeamInput> | AthleteCreateWithoutTeamInput[] | AthleteUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: AthleteCreateOrConnectWithoutTeamInput | AthleteCreateOrConnectWithoutTeamInput[]
    createMany?: AthleteCreateManyTeamInputEnvelope
    connect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<EventCreateWithoutTeamInput, EventUncheckedCreateWithoutTeamInput> | EventCreateWithoutTeamInput[] | EventUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTeamInput | EventCreateOrConnectWithoutTeamInput[]
    createMany?: EventCreateManyTeamInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutTeamNestedInput = {
    create?: XOR<UserCreateWithoutTeamInput, UserUncheckedCreateWithoutTeamInput> | UserCreateWithoutTeamInput[] | UserUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTeamInput | UserCreateOrConnectWithoutTeamInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTeamInput | UserUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: UserCreateManyTeamInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTeamInput | UserUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTeamInput | UserUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AthleteUpdateManyWithoutTeamNestedInput = {
    create?: XOR<AthleteCreateWithoutTeamInput, AthleteUncheckedCreateWithoutTeamInput> | AthleteCreateWithoutTeamInput[] | AthleteUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: AthleteCreateOrConnectWithoutTeamInput | AthleteCreateOrConnectWithoutTeamInput[]
    upsert?: AthleteUpsertWithWhereUniqueWithoutTeamInput | AthleteUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: AthleteCreateManyTeamInputEnvelope
    set?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    disconnect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    delete?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    connect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    update?: AthleteUpdateWithWhereUniqueWithoutTeamInput | AthleteUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: AthleteUpdateManyWithWhereWithoutTeamInput | AthleteUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: AthleteScalarWhereInput | AthleteScalarWhereInput[]
  }

  export type EventUpdateManyWithoutTeamNestedInput = {
    create?: XOR<EventCreateWithoutTeamInput, EventUncheckedCreateWithoutTeamInput> | EventCreateWithoutTeamInput[] | EventUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTeamInput | EventCreateOrConnectWithoutTeamInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutTeamInput | EventUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: EventCreateManyTeamInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutTeamInput | EventUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: EventUpdateManyWithWhereWithoutTeamInput | EventUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<UserCreateWithoutTeamInput, UserUncheckedCreateWithoutTeamInput> | UserCreateWithoutTeamInput[] | UserUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTeamInput | UserCreateOrConnectWithoutTeamInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTeamInput | UserUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: UserCreateManyTeamInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTeamInput | UserUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTeamInput | UserUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AthleteUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<AthleteCreateWithoutTeamInput, AthleteUncheckedCreateWithoutTeamInput> | AthleteCreateWithoutTeamInput[] | AthleteUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: AthleteCreateOrConnectWithoutTeamInput | AthleteCreateOrConnectWithoutTeamInput[]
    upsert?: AthleteUpsertWithWhereUniqueWithoutTeamInput | AthleteUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: AthleteCreateManyTeamInputEnvelope
    set?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    disconnect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    delete?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    connect?: AthleteWhereUniqueInput | AthleteWhereUniqueInput[]
    update?: AthleteUpdateWithWhereUniqueWithoutTeamInput | AthleteUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: AthleteUpdateManyWithWhereWithoutTeamInput | AthleteUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: AthleteScalarWhereInput | AthleteScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<EventCreateWithoutTeamInput, EventUncheckedCreateWithoutTeamInput> | EventCreateWithoutTeamInput[] | EventUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTeamInput | EventCreateOrConnectWithoutTeamInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutTeamInput | EventUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: EventCreateManyTeamInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutTeamInput | EventUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: EventUpdateManyWithWhereWithoutTeamInput | EventUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type AthleteCreateeventsInput = {
    set: string[]
  }

  export type TeamCreateNestedOneWithoutAthletesInput = {
    create?: XOR<TeamCreateWithoutAthletesInput, TeamUncheckedCreateWithoutAthletesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutAthletesInput
    connect?: TeamWhereUniqueInput
  }

  export type AcademicRecordCreateNestedManyWithoutAthleteInput = {
    create?: XOR<AcademicRecordCreateWithoutAthleteInput, AcademicRecordUncheckedCreateWithoutAthleteInput> | AcademicRecordCreateWithoutAthleteInput[] | AcademicRecordUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: AcademicRecordCreateOrConnectWithoutAthleteInput | AcademicRecordCreateOrConnectWithoutAthleteInput[]
    createMany?: AcademicRecordCreateManyAthleteInputEnvelope
    connect?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
  }

  export type HealthRecordCreateNestedManyWithoutAthleteInput = {
    create?: XOR<HealthRecordCreateWithoutAthleteInput, HealthRecordUncheckedCreateWithoutAthleteInput> | HealthRecordCreateWithoutAthleteInput[] | HealthRecordUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: HealthRecordCreateOrConnectWithoutAthleteInput | HealthRecordCreateOrConnectWithoutAthleteInput[]
    createMany?: HealthRecordCreateManyAthleteInputEnvelope
    connect?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
  }

  export type NoteCreateNestedManyWithoutAthleteInput = {
    create?: XOR<NoteCreateWithoutAthleteInput, NoteUncheckedCreateWithoutAthleteInput> | NoteCreateWithoutAthleteInput[] | NoteUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutAthleteInput | NoteCreateOrConnectWithoutAthleteInput[]
    createMany?: NoteCreateManyAthleteInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type AcademicRecordUncheckedCreateNestedManyWithoutAthleteInput = {
    create?: XOR<AcademicRecordCreateWithoutAthleteInput, AcademicRecordUncheckedCreateWithoutAthleteInput> | AcademicRecordCreateWithoutAthleteInput[] | AcademicRecordUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: AcademicRecordCreateOrConnectWithoutAthleteInput | AcademicRecordCreateOrConnectWithoutAthleteInput[]
    createMany?: AcademicRecordCreateManyAthleteInputEnvelope
    connect?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
  }

  export type HealthRecordUncheckedCreateNestedManyWithoutAthleteInput = {
    create?: XOR<HealthRecordCreateWithoutAthleteInput, HealthRecordUncheckedCreateWithoutAthleteInput> | HealthRecordCreateWithoutAthleteInput[] | HealthRecordUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: HealthRecordCreateOrConnectWithoutAthleteInput | HealthRecordCreateOrConnectWithoutAthleteInput[]
    createMany?: HealthRecordCreateManyAthleteInputEnvelope
    connect?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutAthleteInput = {
    create?: XOR<NoteCreateWithoutAthleteInput, NoteUncheckedCreateWithoutAthleteInput> | NoteCreateWithoutAthleteInput[] | NoteUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutAthleteInput | NoteCreateOrConnectWithoutAthleteInput[]
    createMany?: NoteCreateManyAthleteInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AthleteUpdateeventsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableEnumAcademicStandingFieldUpdateOperationsInput = {
    set?: $Enums.AcademicStanding | null
  }

  export type NullableEnumMedicalStatusFieldUpdateOperationsInput = {
    set?: $Enums.MedicalStatus | null
  }

  export type NullableEnumComplianceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ComplianceStatus | null
  }

  export type NullableEnumRiskFlagFieldUpdateOperationsInput = {
    set?: $Enums.RiskFlag | null
  }

  export type TeamUpdateOneRequiredWithoutAthletesNestedInput = {
    create?: XOR<TeamCreateWithoutAthletesInput, TeamUncheckedCreateWithoutAthletesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutAthletesInput
    upsert?: TeamUpsertWithoutAthletesInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutAthletesInput, TeamUpdateWithoutAthletesInput>, TeamUncheckedUpdateWithoutAthletesInput>
  }

  export type AcademicRecordUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<AcademicRecordCreateWithoutAthleteInput, AcademicRecordUncheckedCreateWithoutAthleteInput> | AcademicRecordCreateWithoutAthleteInput[] | AcademicRecordUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: AcademicRecordCreateOrConnectWithoutAthleteInput | AcademicRecordCreateOrConnectWithoutAthleteInput[]
    upsert?: AcademicRecordUpsertWithWhereUniqueWithoutAthleteInput | AcademicRecordUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: AcademicRecordCreateManyAthleteInputEnvelope
    set?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
    disconnect?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
    delete?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
    connect?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
    update?: AcademicRecordUpdateWithWhereUniqueWithoutAthleteInput | AcademicRecordUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: AcademicRecordUpdateManyWithWhereWithoutAthleteInput | AcademicRecordUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: AcademicRecordScalarWhereInput | AcademicRecordScalarWhereInput[]
  }

  export type HealthRecordUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<HealthRecordCreateWithoutAthleteInput, HealthRecordUncheckedCreateWithoutAthleteInput> | HealthRecordCreateWithoutAthleteInput[] | HealthRecordUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: HealthRecordCreateOrConnectWithoutAthleteInput | HealthRecordCreateOrConnectWithoutAthleteInput[]
    upsert?: HealthRecordUpsertWithWhereUniqueWithoutAthleteInput | HealthRecordUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: HealthRecordCreateManyAthleteInputEnvelope
    set?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
    disconnect?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
    delete?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
    connect?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
    update?: HealthRecordUpdateWithWhereUniqueWithoutAthleteInput | HealthRecordUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: HealthRecordUpdateManyWithWhereWithoutAthleteInput | HealthRecordUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: HealthRecordScalarWhereInput | HealthRecordScalarWhereInput[]
  }

  export type NoteUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<NoteCreateWithoutAthleteInput, NoteUncheckedCreateWithoutAthleteInput> | NoteCreateWithoutAthleteInput[] | NoteUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutAthleteInput | NoteCreateOrConnectWithoutAthleteInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutAthleteInput | NoteUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: NoteCreateManyAthleteInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutAthleteInput | NoteUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutAthleteInput | NoteUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type AcademicRecordUncheckedUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<AcademicRecordCreateWithoutAthleteInput, AcademicRecordUncheckedCreateWithoutAthleteInput> | AcademicRecordCreateWithoutAthleteInput[] | AcademicRecordUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: AcademicRecordCreateOrConnectWithoutAthleteInput | AcademicRecordCreateOrConnectWithoutAthleteInput[]
    upsert?: AcademicRecordUpsertWithWhereUniqueWithoutAthleteInput | AcademicRecordUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: AcademicRecordCreateManyAthleteInputEnvelope
    set?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
    disconnect?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
    delete?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
    connect?: AcademicRecordWhereUniqueInput | AcademicRecordWhereUniqueInput[]
    update?: AcademicRecordUpdateWithWhereUniqueWithoutAthleteInput | AcademicRecordUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: AcademicRecordUpdateManyWithWhereWithoutAthleteInput | AcademicRecordUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: AcademicRecordScalarWhereInput | AcademicRecordScalarWhereInput[]
  }

  export type HealthRecordUncheckedUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<HealthRecordCreateWithoutAthleteInput, HealthRecordUncheckedCreateWithoutAthleteInput> | HealthRecordCreateWithoutAthleteInput[] | HealthRecordUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: HealthRecordCreateOrConnectWithoutAthleteInput | HealthRecordCreateOrConnectWithoutAthleteInput[]
    upsert?: HealthRecordUpsertWithWhereUniqueWithoutAthleteInput | HealthRecordUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: HealthRecordCreateManyAthleteInputEnvelope
    set?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
    disconnect?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
    delete?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
    connect?: HealthRecordWhereUniqueInput | HealthRecordWhereUniqueInput[]
    update?: HealthRecordUpdateWithWhereUniqueWithoutAthleteInput | HealthRecordUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: HealthRecordUpdateManyWithWhereWithoutAthleteInput | HealthRecordUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: HealthRecordScalarWhereInput | HealthRecordScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutAthleteNestedInput = {
    create?: XOR<NoteCreateWithoutAthleteInput, NoteUncheckedCreateWithoutAthleteInput> | NoteCreateWithoutAthleteInput[] | NoteUncheckedCreateWithoutAthleteInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutAthleteInput | NoteCreateOrConnectWithoutAthleteInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutAthleteInput | NoteUpsertWithWhereUniqueWithoutAthleteInput[]
    createMany?: NoteCreateManyAthleteInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutAthleteInput | NoteUpdateWithWhereUniqueWithoutAthleteInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutAthleteInput | NoteUpdateManyWithWhereWithoutAthleteInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type AthleteCreateNestedOneWithoutAcademicRecordsInput = {
    create?: XOR<AthleteCreateWithoutAcademicRecordsInput, AthleteUncheckedCreateWithoutAcademicRecordsInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutAcademicRecordsInput
    connect?: AthleteWhereUniqueInput
  }

  export type AthleteUpdateOneRequiredWithoutAcademicRecordsNestedInput = {
    create?: XOR<AthleteCreateWithoutAcademicRecordsInput, AthleteUncheckedCreateWithoutAcademicRecordsInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutAcademicRecordsInput
    upsert?: AthleteUpsertWithoutAcademicRecordsInput
    connect?: AthleteWhereUniqueInput
    update?: XOR<XOR<AthleteUpdateToOneWithWhereWithoutAcademicRecordsInput, AthleteUpdateWithoutAcademicRecordsInput>, AthleteUncheckedUpdateWithoutAcademicRecordsInput>
  }

  export type AthleteCreateNestedOneWithoutHealthRecordsInput = {
    create?: XOR<AthleteCreateWithoutHealthRecordsInput, AthleteUncheckedCreateWithoutHealthRecordsInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutHealthRecordsInput
    connect?: AthleteWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AthleteUpdateOneRequiredWithoutHealthRecordsNestedInput = {
    create?: XOR<AthleteCreateWithoutHealthRecordsInput, AthleteUncheckedCreateWithoutHealthRecordsInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutHealthRecordsInput
    upsert?: AthleteUpsertWithoutHealthRecordsInput
    connect?: AthleteWhereUniqueInput
    update?: XOR<XOR<AthleteUpdateToOneWithWhereWithoutHealthRecordsInput, AthleteUpdateWithoutHealthRecordsInput>, AthleteUncheckedUpdateWithoutHealthRecordsInput>
  }

  export type TeamCreateNestedOneWithoutEventsInput = {
    create?: XOR<TeamCreateWithoutEventsInput, TeamUncheckedCreateWithoutEventsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutEventsInput
    connect?: TeamWhereUniqueInput
  }

  export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType
  }

  export type EnumEventGroupFieldUpdateOperationsInput = {
    set?: $Enums.EventGroup
  }

  export type TeamUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<TeamCreateWithoutEventsInput, TeamUncheckedCreateWithoutEventsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutEventsInput
    upsert?: TeamUpsertWithoutEventsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutEventsInput, TeamUpdateWithoutEventsInput>, TeamUncheckedUpdateWithoutEventsInput>
  }

  export type AthleteCreateNestedOneWithoutNotesInput = {
    create?: XOR<AthleteCreateWithoutNotesInput, AthleteUncheckedCreateWithoutNotesInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutNotesInput
    connect?: AthleteWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNotesInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNoteCategoryFieldUpdateOperationsInput = {
    set?: $Enums.NoteCategory
  }

  export type AthleteUpdateOneWithoutNotesNestedInput = {
    create?: XOR<AthleteCreateWithoutNotesInput, AthleteUncheckedCreateWithoutNotesInput>
    connectOrCreate?: AthleteCreateOrConnectWithoutNotesInput
    upsert?: AthleteUpsertWithoutNotesInput
    disconnect?: AthleteWhereInput | boolean
    delete?: AthleteWhereInput | boolean
    connect?: AthleteWhereUniqueInput
    update?: XOR<XOR<AthleteUpdateToOneWithWhereWithoutNotesInput, AthleteUpdateWithoutNotesInput>, AthleteUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    upsert?: UserUpsertWithoutNotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotesInput, UserUpdateWithoutNotesInput>, UserUncheckedUpdateWithoutNotesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAcademicStandingNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicStanding | EnumAcademicStandingFieldRefInput<$PrismaModel> | null
    in?: $Enums.AcademicStanding[] | ListEnumAcademicStandingFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AcademicStanding[] | ListEnumAcademicStandingFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAcademicStandingNullableFilter<$PrismaModel> | $Enums.AcademicStanding | null
  }

  export type NestedEnumMedicalStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MedicalStatus | EnumMedicalStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.MedicalStatus[] | ListEnumMedicalStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MedicalStatus[] | ListEnumMedicalStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMedicalStatusNullableFilter<$PrismaModel> | $Enums.MedicalStatus | null
  }

  export type NestedEnumComplianceStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplianceStatus | EnumComplianceStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ComplianceStatus[] | ListEnumComplianceStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ComplianceStatus[] | ListEnumComplianceStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumComplianceStatusNullableFilter<$PrismaModel> | $Enums.ComplianceStatus | null
  }

  export type NestedEnumRiskFlagNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskFlag | EnumRiskFlagFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiskFlag[] | ListEnumRiskFlagFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiskFlag[] | ListEnumRiskFlagFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiskFlagNullableFilter<$PrismaModel> | $Enums.RiskFlag | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAcademicStandingNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AcademicStanding | EnumAcademicStandingFieldRefInput<$PrismaModel> | null
    in?: $Enums.AcademicStanding[] | ListEnumAcademicStandingFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AcademicStanding[] | ListEnumAcademicStandingFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAcademicStandingNullableWithAggregatesFilter<$PrismaModel> | $Enums.AcademicStanding | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAcademicStandingNullableFilter<$PrismaModel>
    _max?: NestedEnumAcademicStandingNullableFilter<$PrismaModel>
  }

  export type NestedEnumMedicalStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MedicalStatus | EnumMedicalStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.MedicalStatus[] | ListEnumMedicalStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MedicalStatus[] | ListEnumMedicalStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMedicalStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.MedicalStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMedicalStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumMedicalStatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumComplianceStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ComplianceStatus | EnumComplianceStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ComplianceStatus[] | ListEnumComplianceStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ComplianceStatus[] | ListEnumComplianceStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumComplianceStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ComplianceStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumComplianceStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumComplianceStatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumRiskFlagNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskFlag | EnumRiskFlagFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiskFlag[] | ListEnumRiskFlagFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiskFlag[] | ListEnumRiskFlagFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiskFlagNullableWithAggregatesFilter<$PrismaModel> | $Enums.RiskFlag | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRiskFlagNullableFilter<$PrismaModel>
    _max?: NestedEnumRiskFlagNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type NestedEnumEventGroupFilter<$PrismaModel = never> = {
    equals?: $Enums.EventGroup | EnumEventGroupFieldRefInput<$PrismaModel>
    in?: $Enums.EventGroup[] | ListEnumEventGroupFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventGroup[] | ListEnumEventGroupFieldRefInput<$PrismaModel>
    not?: NestedEnumEventGroupFilter<$PrismaModel> | $Enums.EventGroup
  }

  export type NestedEnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }

  export type NestedEnumEventGroupWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventGroup | EnumEventGroupFieldRefInput<$PrismaModel>
    in?: $Enums.EventGroup[] | ListEnumEventGroupFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventGroup[] | ListEnumEventGroupFieldRefInput<$PrismaModel>
    not?: NestedEnumEventGroupWithAggregatesFilter<$PrismaModel> | $Enums.EventGroup
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventGroupFilter<$PrismaModel>
    _max?: NestedEnumEventGroupFilter<$PrismaModel>
  }

  export type NestedEnumNoteCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.NoteCategory | EnumNoteCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.NoteCategory[] | ListEnumNoteCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.NoteCategory[] | ListEnumNoteCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumNoteCategoryFilter<$PrismaModel> | $Enums.NoteCategory
  }

  export type NestedEnumNoteCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NoteCategory | EnumNoteCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.NoteCategory[] | ListEnumNoteCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.NoteCategory[] | ListEnumNoteCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumNoteCategoryWithAggregatesFilter<$PrismaModel> | $Enums.NoteCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNoteCategoryFilter<$PrismaModel>
    _max?: NestedEnumNoteCategoryFilter<$PrismaModel>
  }

  export type TeamCreateWithoutUsersInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
    athletes?: AthleteCreateNestedManyWithoutTeamInput
    events?: EventCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
    athletes?: AthleteUncheckedCreateNestedManyWithoutTeamInput
    events?: EventUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutUsersInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutUsersInput, TeamUncheckedCreateWithoutUsersInput>
  }

  export type NoteCreateWithoutUserInput = {
    id?: string
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
    athlete?: AthleteCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateWithoutUserInput = {
    id?: string
    athleteId?: string | null
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
  }

  export type NoteCreateOrConnectWithoutUserInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput>
  }

  export type NoteCreateManyUserInputEnvelope = {
    data: NoteCreateManyUserInput | NoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TeamUpsertWithoutUsersInput = {
    update: XOR<TeamUpdateWithoutUsersInput, TeamUncheckedUpdateWithoutUsersInput>
    create: XOR<TeamCreateWithoutUsersInput, TeamUncheckedCreateWithoutUsersInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutUsersInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutUsersInput, TeamUncheckedUpdateWithoutUsersInput>
  }

  export type TeamUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athletes?: AthleteUpdateManyWithoutTeamNestedInput
    events?: EventUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athletes?: AthleteUncheckedUpdateManyWithoutTeamNestedInput
    events?: EventUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type NoteUpsertWithWhereUniqueWithoutUserInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutUserInput, NoteUncheckedUpdateWithoutUserInput>
    create: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutUserInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutUserInput, NoteUncheckedUpdateWithoutUserInput>
  }

  export type NoteUpdateManyWithWhereWithoutUserInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutUserInput>
  }

  export type NoteScalarWhereInput = {
    AND?: NoteScalarWhereInput | NoteScalarWhereInput[]
    OR?: NoteScalarWhereInput[]
    NOT?: NoteScalarWhereInput | NoteScalarWhereInput[]
    id?: StringFilter<"Note"> | string
    athleteId?: StringNullableFilter<"Note"> | string | null
    userId?: StringFilter<"Note"> | string
    category?: EnumNoteCategoryFilter<"Note"> | $Enums.NoteCategory
    body?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
  }

  export type UserCreateWithoutTeamInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTeamInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTeamInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeamInput, UserUncheckedCreateWithoutTeamInput>
  }

  export type UserCreateManyTeamInputEnvelope = {
    data: UserCreateManyTeamInput | UserCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type AthleteCreateWithoutTeamInput = {
    id?: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    academicRecords?: AcademicRecordCreateNestedManyWithoutAthleteInput
    healthRecords?: HealthRecordCreateNestedManyWithoutAthleteInput
    notes?: NoteCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateWithoutTeamInput = {
    id?: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUncheckedCreateNestedManyWithoutAthleteInput
    healthRecords?: HealthRecordUncheckedCreateNestedManyWithoutAthleteInput
    notes?: NoteUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteCreateOrConnectWithoutTeamInput = {
    where: AthleteWhereUniqueInput
    create: XOR<AthleteCreateWithoutTeamInput, AthleteUncheckedCreateWithoutTeamInput>
  }

  export type AthleteCreateManyTeamInputEnvelope = {
    data: AthleteCreateManyTeamInput | AthleteCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutTeamInput = {
    id?: string
    type: $Enums.EventType
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    opponent?: string | null
    group: $Enums.EventGroup
    createdByUserId?: string | null
    createdAt?: Date | string
  }

  export type EventUncheckedCreateWithoutTeamInput = {
    id?: string
    type: $Enums.EventType
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    opponent?: string | null
    group: $Enums.EventGroup
    createdByUserId?: string | null
    createdAt?: Date | string
  }

  export type EventCreateOrConnectWithoutTeamInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutTeamInput, EventUncheckedCreateWithoutTeamInput>
  }

  export type EventCreateManyTeamInputEnvelope = {
    data: EventCreateManyTeamInput | EventCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutTeamInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTeamInput, UserUncheckedUpdateWithoutTeamInput>
    create: XOR<UserCreateWithoutTeamInput, UserUncheckedCreateWithoutTeamInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTeamInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTeamInput, UserUncheckedUpdateWithoutTeamInput>
  }

  export type UserUpdateManyWithWhereWithoutTeamInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTeamInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    teamId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type AthleteUpsertWithWhereUniqueWithoutTeamInput = {
    where: AthleteWhereUniqueInput
    update: XOR<AthleteUpdateWithoutTeamInput, AthleteUncheckedUpdateWithoutTeamInput>
    create: XOR<AthleteCreateWithoutTeamInput, AthleteUncheckedCreateWithoutTeamInput>
  }

  export type AthleteUpdateWithWhereUniqueWithoutTeamInput = {
    where: AthleteWhereUniqueInput
    data: XOR<AthleteUpdateWithoutTeamInput, AthleteUncheckedUpdateWithoutTeamInput>
  }

  export type AthleteUpdateManyWithWhereWithoutTeamInput = {
    where: AthleteScalarWhereInput
    data: XOR<AthleteUpdateManyMutationInput, AthleteUncheckedUpdateManyWithoutTeamInput>
  }

  export type AthleteScalarWhereInput = {
    AND?: AthleteScalarWhereInput | AthleteScalarWhereInput[]
    OR?: AthleteScalarWhereInput[]
    NOT?: AthleteScalarWhereInput | AthleteScalarWhereInput[]
    id?: StringFilter<"Athlete"> | string
    teamId?: StringFilter<"Athlete"> | string
    name?: StringFilter<"Athlete"> | string
    jerseyNumber?: IntNullableFilter<"Athlete"> | number | null
    height?: FloatNullableFilter<"Athlete"> | number | null
    weight?: FloatNullableFilter<"Athlete"> | number | null
    classYear?: StringNullableFilter<"Athlete"> | string | null
    sport?: StringNullableFilter<"Athlete"> | string | null
    events?: StringNullableListFilter<"Athlete">
    eventRecords?: JsonNullableFilter<"Athlete">
    gpa?: FloatNullableFilter<"Athlete"> | number | null
    academicStanding?: EnumAcademicStandingNullableFilter<"Athlete"> | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: FloatNullableFilter<"Athlete"> | number | null
    recruitingStatus?: StringNullableFilter<"Athlete"> | string | null
    contactInfo?: StringNullableFilter<"Athlete"> | string | null
    transferProbability?: FloatNullableFilter<"Athlete"> | number | null
    medicalStatus?: EnumMedicalStatusNullableFilter<"Athlete"> | $Enums.MedicalStatus | null
    complianceStatus?: EnumComplianceStatusNullableFilter<"Athlete"> | $Enums.ComplianceStatus | null
    riskFlag?: EnumRiskFlagNullableFilter<"Athlete"> | $Enums.RiskFlag | null
  }

  export type EventUpsertWithWhereUniqueWithoutTeamInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutTeamInput, EventUncheckedUpdateWithoutTeamInput>
    create: XOR<EventCreateWithoutTeamInput, EventUncheckedCreateWithoutTeamInput>
  }

  export type EventUpdateWithWhereUniqueWithoutTeamInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutTeamInput, EventUncheckedUpdateWithoutTeamInput>
  }

  export type EventUpdateManyWithWhereWithoutTeamInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutTeamInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    teamId?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    title?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    location?: StringNullableFilter<"Event"> | string | null
    opponent?: StringNullableFilter<"Event"> | string | null
    group?: EnumEventGroupFilter<"Event"> | $Enums.EventGroup
    createdByUserId?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type TeamCreateWithoutAthletesInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTeamInput
    events?: EventCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutAthletesInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTeamInput
    events?: EventUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutAthletesInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutAthletesInput, TeamUncheckedCreateWithoutAthletesInput>
  }

  export type AcademicRecordCreateWithoutAthleteInput = {
    id?: string
    semester: string
    finalScore?: number | null
    termGpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    complianceStatus?: $Enums.ComplianceStatus | null
    attendancePercent?: number | null
    tutoringHours?: number | null
    advisorNotes?: string | null
    createdAt?: Date | string
  }

  export type AcademicRecordUncheckedCreateWithoutAthleteInput = {
    id?: string
    semester: string
    finalScore?: number | null
    termGpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    complianceStatus?: $Enums.ComplianceStatus | null
    attendancePercent?: number | null
    tutoringHours?: number | null
    advisorNotes?: string | null
    createdAt?: Date | string
  }

  export type AcademicRecordCreateOrConnectWithoutAthleteInput = {
    where: AcademicRecordWhereUniqueInput
    create: XOR<AcademicRecordCreateWithoutAthleteInput, AcademicRecordUncheckedCreateWithoutAthleteInput>
  }

  export type AcademicRecordCreateManyAthleteInputEnvelope = {
    data: AcademicRecordCreateManyAthleteInput | AcademicRecordCreateManyAthleteInput[]
    skipDuplicates?: boolean
  }

  export type HealthRecordCreateWithoutAthleteInput = {
    id?: string
    injuryType?: string | null
    injuryDate?: Date | string | null
    status?: $Enums.MedicalStatus | null
    rehabSessions?: number | null
    appointmentAttendance?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type HealthRecordUncheckedCreateWithoutAthleteInput = {
    id?: string
    injuryType?: string | null
    injuryDate?: Date | string | null
    status?: $Enums.MedicalStatus | null
    rehabSessions?: number | null
    appointmentAttendance?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type HealthRecordCreateOrConnectWithoutAthleteInput = {
    where: HealthRecordWhereUniqueInput
    create: XOR<HealthRecordCreateWithoutAthleteInput, HealthRecordUncheckedCreateWithoutAthleteInput>
  }

  export type HealthRecordCreateManyAthleteInputEnvelope = {
    data: HealthRecordCreateManyAthleteInput | HealthRecordCreateManyAthleteInput[]
    skipDuplicates?: boolean
  }

  export type NoteCreateWithoutAthleteInput = {
    id?: string
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateWithoutAthleteInput = {
    id?: string
    userId: string
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
  }

  export type NoteCreateOrConnectWithoutAthleteInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutAthleteInput, NoteUncheckedCreateWithoutAthleteInput>
  }

  export type NoteCreateManyAthleteInputEnvelope = {
    data: NoteCreateManyAthleteInput | NoteCreateManyAthleteInput[]
    skipDuplicates?: boolean
  }

  export type TeamUpsertWithoutAthletesInput = {
    update: XOR<TeamUpdateWithoutAthletesInput, TeamUncheckedUpdateWithoutAthletesInput>
    create: XOR<TeamCreateWithoutAthletesInput, TeamUncheckedCreateWithoutAthletesInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutAthletesInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutAthletesInput, TeamUncheckedUpdateWithoutAthletesInput>
  }

  export type TeamUpdateWithoutAthletesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTeamNestedInput
    events?: EventUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutAthletesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTeamNestedInput
    events?: EventUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type AcademicRecordUpsertWithWhereUniqueWithoutAthleteInput = {
    where: AcademicRecordWhereUniqueInput
    update: XOR<AcademicRecordUpdateWithoutAthleteInput, AcademicRecordUncheckedUpdateWithoutAthleteInput>
    create: XOR<AcademicRecordCreateWithoutAthleteInput, AcademicRecordUncheckedCreateWithoutAthleteInput>
  }

  export type AcademicRecordUpdateWithWhereUniqueWithoutAthleteInput = {
    where: AcademicRecordWhereUniqueInput
    data: XOR<AcademicRecordUpdateWithoutAthleteInput, AcademicRecordUncheckedUpdateWithoutAthleteInput>
  }

  export type AcademicRecordUpdateManyWithWhereWithoutAthleteInput = {
    where: AcademicRecordScalarWhereInput
    data: XOR<AcademicRecordUpdateManyMutationInput, AcademicRecordUncheckedUpdateManyWithoutAthleteInput>
  }

  export type AcademicRecordScalarWhereInput = {
    AND?: AcademicRecordScalarWhereInput | AcademicRecordScalarWhereInput[]
    OR?: AcademicRecordScalarWhereInput[]
    NOT?: AcademicRecordScalarWhereInput | AcademicRecordScalarWhereInput[]
    id?: StringFilter<"AcademicRecord"> | string
    athleteId?: StringFilter<"AcademicRecord"> | string
    semester?: StringFilter<"AcademicRecord"> | string
    finalScore?: FloatNullableFilter<"AcademicRecord"> | number | null
    termGpa?: FloatNullableFilter<"AcademicRecord"> | number | null
    academicStanding?: EnumAcademicStandingNullableFilter<"AcademicRecord"> | $Enums.AcademicStanding | null
    complianceStatus?: EnumComplianceStatusNullableFilter<"AcademicRecord"> | $Enums.ComplianceStatus | null
    attendancePercent?: FloatNullableFilter<"AcademicRecord"> | number | null
    tutoringHours?: FloatNullableFilter<"AcademicRecord"> | number | null
    advisorNotes?: StringNullableFilter<"AcademicRecord"> | string | null
    createdAt?: DateTimeFilter<"AcademicRecord"> | Date | string
  }

  export type HealthRecordUpsertWithWhereUniqueWithoutAthleteInput = {
    where: HealthRecordWhereUniqueInput
    update: XOR<HealthRecordUpdateWithoutAthleteInput, HealthRecordUncheckedUpdateWithoutAthleteInput>
    create: XOR<HealthRecordCreateWithoutAthleteInput, HealthRecordUncheckedCreateWithoutAthleteInput>
  }

  export type HealthRecordUpdateWithWhereUniqueWithoutAthleteInput = {
    where: HealthRecordWhereUniqueInput
    data: XOR<HealthRecordUpdateWithoutAthleteInput, HealthRecordUncheckedUpdateWithoutAthleteInput>
  }

  export type HealthRecordUpdateManyWithWhereWithoutAthleteInput = {
    where: HealthRecordScalarWhereInput
    data: XOR<HealthRecordUpdateManyMutationInput, HealthRecordUncheckedUpdateManyWithoutAthleteInput>
  }

  export type HealthRecordScalarWhereInput = {
    AND?: HealthRecordScalarWhereInput | HealthRecordScalarWhereInput[]
    OR?: HealthRecordScalarWhereInput[]
    NOT?: HealthRecordScalarWhereInput | HealthRecordScalarWhereInput[]
    id?: StringFilter<"HealthRecord"> | string
    athleteId?: StringFilter<"HealthRecord"> | string
    injuryType?: StringNullableFilter<"HealthRecord"> | string | null
    injuryDate?: DateTimeNullableFilter<"HealthRecord"> | Date | string | null
    status?: EnumMedicalStatusNullableFilter<"HealthRecord"> | $Enums.MedicalStatus | null
    rehabSessions?: IntNullableFilter<"HealthRecord"> | number | null
    appointmentAttendance?: FloatNullableFilter<"HealthRecord"> | number | null
    notes?: StringNullableFilter<"HealthRecord"> | string | null
    createdAt?: DateTimeFilter<"HealthRecord"> | Date | string
  }

  export type NoteUpsertWithWhereUniqueWithoutAthleteInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutAthleteInput, NoteUncheckedUpdateWithoutAthleteInput>
    create: XOR<NoteCreateWithoutAthleteInput, NoteUncheckedCreateWithoutAthleteInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutAthleteInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutAthleteInput, NoteUncheckedUpdateWithoutAthleteInput>
  }

  export type NoteUpdateManyWithWhereWithoutAthleteInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutAthleteInput>
  }

  export type AthleteCreateWithoutAcademicRecordsInput = {
    id?: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    team: TeamCreateNestedOneWithoutAthletesInput
    healthRecords?: HealthRecordCreateNestedManyWithoutAthleteInput
    notes?: NoteCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateWithoutAcademicRecordsInput = {
    id?: string
    teamId: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    healthRecords?: HealthRecordUncheckedCreateNestedManyWithoutAthleteInput
    notes?: NoteUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteCreateOrConnectWithoutAcademicRecordsInput = {
    where: AthleteWhereUniqueInput
    create: XOR<AthleteCreateWithoutAcademicRecordsInput, AthleteUncheckedCreateWithoutAcademicRecordsInput>
  }

  export type AthleteUpsertWithoutAcademicRecordsInput = {
    update: XOR<AthleteUpdateWithoutAcademicRecordsInput, AthleteUncheckedUpdateWithoutAcademicRecordsInput>
    create: XOR<AthleteCreateWithoutAcademicRecordsInput, AthleteUncheckedCreateWithoutAcademicRecordsInput>
    where?: AthleteWhereInput
  }

  export type AthleteUpdateToOneWithWhereWithoutAcademicRecordsInput = {
    where?: AthleteWhereInput
    data: XOR<AthleteUpdateWithoutAcademicRecordsInput, AthleteUncheckedUpdateWithoutAcademicRecordsInput>
  }

  export type AthleteUpdateWithoutAcademicRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    team?: TeamUpdateOneRequiredWithoutAthletesNestedInput
    healthRecords?: HealthRecordUpdateManyWithoutAthleteNestedInput
    notes?: NoteUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateWithoutAcademicRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    healthRecords?: HealthRecordUncheckedUpdateManyWithoutAthleteNestedInput
    notes?: NoteUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteCreateWithoutHealthRecordsInput = {
    id?: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    team: TeamCreateNestedOneWithoutAthletesInput
    academicRecords?: AcademicRecordCreateNestedManyWithoutAthleteInput
    notes?: NoteCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateWithoutHealthRecordsInput = {
    id?: string
    teamId: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUncheckedCreateNestedManyWithoutAthleteInput
    notes?: NoteUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteCreateOrConnectWithoutHealthRecordsInput = {
    where: AthleteWhereUniqueInput
    create: XOR<AthleteCreateWithoutHealthRecordsInput, AthleteUncheckedCreateWithoutHealthRecordsInput>
  }

  export type AthleteUpsertWithoutHealthRecordsInput = {
    update: XOR<AthleteUpdateWithoutHealthRecordsInput, AthleteUncheckedUpdateWithoutHealthRecordsInput>
    create: XOR<AthleteCreateWithoutHealthRecordsInput, AthleteUncheckedCreateWithoutHealthRecordsInput>
    where?: AthleteWhereInput
  }

  export type AthleteUpdateToOneWithWhereWithoutHealthRecordsInput = {
    where?: AthleteWhereInput
    data: XOR<AthleteUpdateWithoutHealthRecordsInput, AthleteUncheckedUpdateWithoutHealthRecordsInput>
  }

  export type AthleteUpdateWithoutHealthRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    team?: TeamUpdateOneRequiredWithoutAthletesNestedInput
    academicRecords?: AcademicRecordUpdateManyWithoutAthleteNestedInput
    notes?: NoteUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateWithoutHealthRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUncheckedUpdateManyWithoutAthleteNestedInput
    notes?: NoteUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type TeamCreateWithoutEventsInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutTeamInput
    athletes?: AthleteCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    sport: string
    institution?: string | null
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutTeamInput
    athletes?: AthleteUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutEventsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutEventsInput, TeamUncheckedCreateWithoutEventsInput>
  }

  export type TeamUpsertWithoutEventsInput = {
    update: XOR<TeamUpdateWithoutEventsInput, TeamUncheckedUpdateWithoutEventsInput>
    create: XOR<TeamCreateWithoutEventsInput, TeamUncheckedCreateWithoutEventsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutEventsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutEventsInput, TeamUncheckedUpdateWithoutEventsInput>
  }

  export type TeamUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutTeamNestedInput
    athletes?: AthleteUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sport?: StringFieldUpdateOperationsInput | string
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutTeamNestedInput
    athletes?: AthleteUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type AthleteCreateWithoutNotesInput = {
    id?: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    team: TeamCreateNestedOneWithoutAthletesInput
    academicRecords?: AcademicRecordCreateNestedManyWithoutAthleteInput
    healthRecords?: HealthRecordCreateNestedManyWithoutAthleteInput
  }

  export type AthleteUncheckedCreateWithoutNotesInput = {
    id?: string
    teamId: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUncheckedCreateNestedManyWithoutAthleteInput
    healthRecords?: HealthRecordUncheckedCreateNestedManyWithoutAthleteInput
  }

  export type AthleteCreateOrConnectWithoutNotesInput = {
    where: AthleteWhereUniqueInput
    create: XOR<AthleteCreateWithoutNotesInput, AthleteUncheckedCreateWithoutNotesInput>
  }

  export type UserCreateWithoutNotesInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    team?: TeamCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutNotesInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    teamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
  }

  export type AthleteUpsertWithoutNotesInput = {
    update: XOR<AthleteUpdateWithoutNotesInput, AthleteUncheckedUpdateWithoutNotesInput>
    create: XOR<AthleteCreateWithoutNotesInput, AthleteUncheckedCreateWithoutNotesInput>
    where?: AthleteWhereInput
  }

  export type AthleteUpdateToOneWithWhereWithoutNotesInput = {
    where?: AthleteWhereInput
    data: XOR<AthleteUpdateWithoutNotesInput, AthleteUncheckedUpdateWithoutNotesInput>
  }

  export type AthleteUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    team?: TeamUpdateOneRequiredWithoutAthletesNestedInput
    academicRecords?: AcademicRecordUpdateManyWithoutAthleteNestedInput
    healthRecords?: HealthRecordUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUncheckedUpdateManyWithoutAthleteNestedInput
    healthRecords?: HealthRecordUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type UserUpsertWithoutNotesInput = {
    update: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteCreateManyUserInput = {
    id?: string
    athleteId?: string | null
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
  }

  export type NoteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    athlete?: AthleteUpdateOneWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    athleteId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyTeamInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AthleteCreateManyTeamInput = {
    id?: string
    name: string
    jerseyNumber?: number | null
    height?: number | null
    weight?: number | null
    classYear?: string | null
    sport?: string | null
    events?: AthleteCreateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    eligibilityYearsLeft?: number | null
    recruitingStatus?: string | null
    contactInfo?: string | null
    transferProbability?: number | null
    medicalStatus?: $Enums.MedicalStatus | null
    complianceStatus?: $Enums.ComplianceStatus | null
    riskFlag?: $Enums.RiskFlag | null
  }

  export type EventCreateManyTeamInput = {
    id?: string
    type: $Enums.EventType
    title: string
    description?: string | null
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    opponent?: string | null
    group: $Enums.EventGroup
    createdByUserId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUpdateManyWithoutAthleteNestedInput
    healthRecords?: HealthRecordUpdateManyWithoutAthleteNestedInput
    notes?: NoteUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
    academicRecords?: AcademicRecordUncheckedUpdateManyWithoutAthleteNestedInput
    healthRecords?: HealthRecordUncheckedUpdateManyWithoutAthleteNestedInput
    notes?: NoteUncheckedUpdateManyWithoutAthleteNestedInput
  }

  export type AthleteUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jerseyNumber?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    classYear?: NullableStringFieldUpdateOperationsInput | string | null
    sport?: NullableStringFieldUpdateOperationsInput | string | null
    events?: AthleteUpdateeventsInput | string[]
    eventRecords?: NullableJsonNullValueInput | InputJsonValue
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    eligibilityYearsLeft?: NullableFloatFieldUpdateOperationsInput | number | null
    recruitingStatus?: NullableStringFieldUpdateOperationsInput | string | null
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    transferProbability?: NullableFloatFieldUpdateOperationsInput | number | null
    medicalStatus?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    riskFlag?: NullableEnumRiskFlagFieldUpdateOperationsInput | $Enums.RiskFlag | null
  }

  export type EventUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    group?: EnumEventGroupFieldUpdateOperationsInput | $Enums.EventGroup
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    group?: EnumEventGroupFieldUpdateOperationsInput | $Enums.EventGroup
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    opponent?: NullableStringFieldUpdateOperationsInput | string | null
    group?: EnumEventGroupFieldUpdateOperationsInput | $Enums.EventGroup
    createdByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicRecordCreateManyAthleteInput = {
    id?: string
    semester: string
    finalScore?: number | null
    termGpa?: number | null
    academicStanding?: $Enums.AcademicStanding | null
    complianceStatus?: $Enums.ComplianceStatus | null
    attendancePercent?: number | null
    tutoringHours?: number | null
    advisorNotes?: string | null
    createdAt?: Date | string
  }

  export type HealthRecordCreateManyAthleteInput = {
    id?: string
    injuryType?: string | null
    injuryDate?: Date | string | null
    status?: $Enums.MedicalStatus | null
    rehabSessions?: number | null
    appointmentAttendance?: number | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type NoteCreateManyAthleteInput = {
    id?: string
    userId: string
    category: $Enums.NoteCategory
    body: string
    createdAt?: Date | string
  }

  export type AcademicRecordUpdateWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    finalScore?: NullableFloatFieldUpdateOperationsInput | number | null
    termGpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    attendancePercent?: NullableFloatFieldUpdateOperationsInput | number | null
    tutoringHours?: NullableFloatFieldUpdateOperationsInput | number | null
    advisorNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicRecordUncheckedUpdateWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    finalScore?: NullableFloatFieldUpdateOperationsInput | number | null
    termGpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    attendancePercent?: NullableFloatFieldUpdateOperationsInput | number | null
    tutoringHours?: NullableFloatFieldUpdateOperationsInput | number | null
    advisorNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicRecordUncheckedUpdateManyWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    finalScore?: NullableFloatFieldUpdateOperationsInput | number | null
    termGpa?: NullableFloatFieldUpdateOperationsInput | number | null
    academicStanding?: NullableEnumAcademicStandingFieldUpdateOperationsInput | $Enums.AcademicStanding | null
    complianceStatus?: NullableEnumComplianceStatusFieldUpdateOperationsInput | $Enums.ComplianceStatus | null
    attendancePercent?: NullableFloatFieldUpdateOperationsInput | number | null
    tutoringHours?: NullableFloatFieldUpdateOperationsInput | number | null
    advisorNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthRecordUpdateWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    injuryType?: NullableStringFieldUpdateOperationsInput | string | null
    injuryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    rehabSessions?: NullableIntFieldUpdateOperationsInput | number | null
    appointmentAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthRecordUncheckedUpdateWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    injuryType?: NullableStringFieldUpdateOperationsInput | string | null
    injuryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    rehabSessions?: NullableIntFieldUpdateOperationsInput | number | null
    appointmentAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthRecordUncheckedUpdateManyWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    injuryType?: NullableStringFieldUpdateOperationsInput | string | null
    injuryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumMedicalStatusFieldUpdateOperationsInput | $Enums.MedicalStatus | null
    rehabSessions?: NullableIntFieldUpdateOperationsInput | number | null
    appointmentAttendance?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUpdateWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateManyWithoutAthleteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    category?: EnumNoteCategoryFieldUpdateOperationsInput | $Enums.NoteCategory
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}