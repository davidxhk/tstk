import type { Descriptor, Property } from "."

/**
 * A type descriptor representing a record with some type of value
 */
export interface RecordDescriptor extends Record<keyof any, Property | Descriptor> {}
