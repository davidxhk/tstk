import type { AnyTuple } from "./types"

/**
 * Define a tuple type
 */
export const tuple = <const T extends AnyTuple>(...type: T): T => type
