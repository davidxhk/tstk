import type { Any, Property, AnyRecord, AnyTuple, EmptyTuple, Type } from "../types"
import { has } from "../has"
import { getProps } from "./get-props"
import { hasProp } from "./has-prop"
import { isObject } from "./is-object"

export const isExact = <T extends AnyRecord | AnyTuple | EmptyTuple>(value: unknown, type: T): value is Type<T> => isObject(value) && getProps(value).every(prop => hasProp(type, prop)) && getProps(type).every(prop => has(value, prop, type[prop] as Any | Property))
