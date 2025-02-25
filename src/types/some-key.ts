import type { Key } from "./key"
import type { SomeRecord } from "./some-record"

/**
 * A catch-all type to which any key descriptor is assignable
 */
export type SomeKey = Key<SomeRecord>
