import type { Merge, Tuple } from "./types"

/**
 * Merge each U into T, with last taking precedence
 */
export const merge = <const T extends object, U extends Tuple<object>>(target: T, ...source: U): Merge<[T, ...U]> => Object.assign(target, ...source)
