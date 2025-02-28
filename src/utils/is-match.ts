import type { Any, AnyRecord, AnyTuple, EmptyTuple, Property, Type } from "../types"
import { getProps, hasProp, isObject } from "."
import { has } from "../has"

/**
 * Check if a value matches T
 */
export const isMatch = <T extends AnyRecord | AnyTuple | EmptyTuple>(value: unknown, type: T, exact: boolean): value is Type<T> => isObject(value) && (!exact || getProps(value).every(prop => hasProp(type, prop))) && getProps(type).every(prop => has(value, prop, type[prop] as Any | Property))
