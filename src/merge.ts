import type { Merge, Simplify, Tuple } from "./types"

/**
 * Merge each T into a new object, with last taking precedence
 */
export const merge = <const T extends Tuple<object>>(...object: T): Simplify<Merge<T>> => Object.assign({}, ...object)
