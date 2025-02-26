import type { Any, Property } from "."

/**
 * A record descriptor representing a record that has a set of properties
 */
export interface AnyRecord extends Record<keyof any, Any | Property> {}
