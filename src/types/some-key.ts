import type { Key } from "./key"
import type { SomeRecord } from "./some-record"

/**
 * A generic key that is assignable to any key descriptor
 */
export type SomeKey = Key<SomeRecord>
