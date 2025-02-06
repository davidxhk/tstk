import type { AnyTuple, Type } from "./types"
import { is } from "./is"

/**
 * Check if a value is a union of T
 */
export const union = <T extends AnyTuple>(...type: T) => (value: unknown): value is Type<T[number]> => type.some(type => is(value, type))
