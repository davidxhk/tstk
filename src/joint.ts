import type { Any, AnyTuple, Type, UnionToIntersection } from "./types"
import { is } from "."

/**
 * Check if a value is the intersection of T
 */
export const joint = <const T extends AnyTuple>(...type: T) => (value: unknown): value is UnionToIntersection<Type<T[number]>> => type.every(<T extends Any>(type: T) => is(value, type, false))
