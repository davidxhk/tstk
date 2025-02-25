/**
 * A catch-all type to which any record type is assignable
 */
export type SomeRecord = Record<keyof any, unknown>
