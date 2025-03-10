import type { EmptyTuple, TupleDescriptor, TupleType } from "../types"
import { isArray, isEqual } from "."
import { is } from "../is"

/**
 * Match tuple T
 */
export const matchesTuple = <T extends TupleDescriptor | EmptyTuple>(value: unknown, type: T, exact: boolean): value is TupleType<T> => isArray(value) && isEqual(value.length, type.length) && type.every((type, index) => is(value[index], type, exact))
