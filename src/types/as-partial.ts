import type { AsOptional, RecordDescriptor } from "."

/**
 * Construct from T a record descriptor whose properties are all marked optional
 */
export type AsPartial<T extends RecordDescriptor> = { [K in keyof T]: AsOptional<T[K]> }
