import type { TupleDescriptor, Type } from "./types"
import { is } from "."

/**
 * Define a union type of T
 */
export const union = <const T extends TupleDescriptor>(...type: T) => (value: unknown): value is Type<T[number]> => type.some(type => is(value, type))
