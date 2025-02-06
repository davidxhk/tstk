import type { AnyTuple } from "./types"

/**
 * Define a tuple type
 */
export const tuple = <T extends AnyTuple>(...type: T): T => type
