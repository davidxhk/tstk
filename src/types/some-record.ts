/**
 * A generic record that is assignable to any record type
 */
export type SomeRecord = Record<keyof any, unknown>
