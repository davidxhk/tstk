import type { Any, Reject, SomeArray, Type } from "./types"
import { is } from "."

/**
 * Filter T with U and return only the elements that did not match
 */
export const reject = <const T extends SomeArray, U extends Any>(value: T, type: U): Reject<T, Type<U>> => value.filter(elem => !is(elem, type)) as Reject<T, Type<U>>
