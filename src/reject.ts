import type { Descriptor, Reject, SomeArray, Type } from "./types"
import { is } from "."

/**
 * Filter T with U and return only the elements that did not match
 */
export const reject = <const T extends SomeArray, U extends Descriptor>(array: T, type: U): Reject<T, Type<U>> => array.filter(elem => !is(elem, type)) as Reject<T, Type<U>>
