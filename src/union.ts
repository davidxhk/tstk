import type { AnyTuple, Type } from "./types"
import { is } from "."

/**
 * Check if a value is the union of T
 */
export const union = <const T extends AnyTuple>(...type: T) => (value: unknown): value is Type<T[number]> => type.some(type => is(value, type))
