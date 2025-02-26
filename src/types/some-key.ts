import type { Key, SomeRecord } from "."

/**
 * A catch-all type to which any key descriptor is assignable
 */
export type SomeKey = Key<SomeRecord>
