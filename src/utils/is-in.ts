import type { PropertyType } from "../types"

/**
 * Match objects with K
 */
export const isIn = <const K extends PropertyKey>(object: object, prop: K): object is PropertyType<K> => Object.hasOwn(object, prop)
