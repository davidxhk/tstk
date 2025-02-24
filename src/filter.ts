import type { Any, Filter, SomeArray, Type } from "./types"
import { is } from "./is"

/**
 * Filter T with U and return only the elements that match
 */
export const filter = <const T extends SomeArray, U extends Any>(value: T, type: U): Filter<T, Type<U>> => value.filter<Type<U>>(elem => is(elem, type)) as Filter<T, Type<U>>
