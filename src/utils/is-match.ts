import type { Descriptor, EmptyTuple, Property, RecordDescriptor, TupleDescriptor, Type } from "../types"
import { isFalse, isIn, isObject, keys } from "."
import { has } from "../has"

/**
 * Check if a value matches T
 */
export const isMatch = <T extends RecordDescriptor | TupleDescriptor | EmptyTuple>(value: unknown, type: T, exact: boolean): value is Type<T> => isObject(value) && keys(type).every(<K extends keyof T>(prop: K) => has(value, prop, type[prop] as Property | Descriptor, exact)) && (isFalse(exact) || keys(value).every(prop => isIn(type, prop)))
