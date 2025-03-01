import type { TupleDescriptor } from "./types"

/**
 * Define a tuple type
 */
export const tuple = <const T extends TupleDescriptor>(...type: T): T => type
