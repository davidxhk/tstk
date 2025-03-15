import type { TupleDescriptor } from "./types"

/**
 * Define a tuple type of T
 */
export const tuple = <const T extends TupleDescriptor>(...type: T): T => type
