import type { AnyRecord } from "./any-record"
import type { AsOptional } from "./as-optional"

/**
 * Construct from T a record descriptor whose properties are all marked optional
 */
export type PartialRecord<T extends AnyRecord> = { [K in keyof T]: AsOptional<T[K]> }
