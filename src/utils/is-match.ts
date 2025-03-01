import type { Descriptor, EmptyTuple, Property, RecordDescriptor, TupleDescriptor, Type } from "../types"
import { isIn, isObject, keys } from "."
import { is } from "../is"

/**
 * Check if a value matches T
 */
export const isMatch = <T extends RecordDescriptor | TupleDescriptor | EmptyTuple>(value: unknown, type: T, exact: boolean): value is Type<T> => isObject(value) && keys(type).every(<K extends keyof T>(prop: K) => isIn(value, prop) && is(value[prop], type[prop] as Property | Descriptor, exact)) && (!exact || keys(value).every(prop => isIn(type, prop)))
