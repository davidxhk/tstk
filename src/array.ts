import type { Any, Type } from "./types"
import { is } from "./is"
import { isArray } from "./utils"

/**
 * Check if a value is an array of T
 */
export const array = <const T extends Any>(type: T) => (value: unknown): value is Type<T>[] => isArray(value) && value.every(elem => is(elem, type))
