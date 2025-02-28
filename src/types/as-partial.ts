import type { AnyRecord, AsOptional } from "."

/**
 * Construct from T a record descriptor whose properties are all marked optional
 */
export type AsPartial<T extends AnyRecord> = { [K in keyof T]: AsOptional<T[K]> }
