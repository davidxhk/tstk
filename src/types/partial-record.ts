import type { AnyRecord, AsOptional } from "."

/**
 * Construct from T a record descriptor whose properties are all marked optional
 */
export type PartialRecord<T extends AnyRecord> = { [K in keyof T]: AsOptional<T[K]> }
