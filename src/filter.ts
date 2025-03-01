import type { Descriptor, Filter, SomeArray, Type } from "./types"
import { is } from "."

/**
 * Filter T with U and return only the elements that match
 */
export const filter = <const T extends SomeArray, U extends Descriptor>(array: T, type: U): Filter<T, Type<U>> => array.filter<Type<U>>(elem => is(elem, type)) as Filter<T, Type<U>>
