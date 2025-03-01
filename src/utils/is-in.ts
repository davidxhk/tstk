import type { PropertyType } from "../types"

/**
 * Check if K is in an object
 */
export const isIn = <const K extends PropertyKey>(object: object, prop: K): object is PropertyType<K> => Object.hasOwn(object, prop)
