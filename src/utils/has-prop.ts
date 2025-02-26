import type { PropertyType } from "../types"

/**
 * Check if a value has property K
 */
export const hasProp = <const K extends PropertyKey>(value: object, prop: K): value is PropertyType<K> => Object.hasOwn(value, prop)
