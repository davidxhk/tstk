import type { AsOptional, RecordDescriptor, RequiredKeys } from "."

/**
 * Construct from T a record descriptor whose properties are all marked optional
 */
export type AsPartial<T extends RecordDescriptor> = { [K in RequiredKeys<T>]: AsOptional<T[K]> }
