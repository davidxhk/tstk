import type { Descriptor, Simplify, TupleDescriptor, Type, UnionToIntersection } from "./types"
import { is } from "."

/**
 * Define a joint type that matches the intersection of T
 */
export const joint = <const T extends TupleDescriptor>(...type: T) => (value: unknown): value is Simplify<UnionToIntersection<Type<T[number]>>> => type.every(<T extends Descriptor>(type: T) => is(value, type, false))
