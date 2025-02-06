import type { PropertyType } from "../types"

export const hasProp = <const K extends PropertyKey>(value: object, prop: K): value is PropertyType<K> => Object.hasOwn(value, prop)
