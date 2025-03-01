import type { TupleDescriptor } from "../types"
import { isArray, isDescriptor } from "."

/**
 * Check if a value is a tuple descriptor
 */
export const isTupleDescriptor = (value: unknown): value is TupleDescriptor => isArray(value) && value.every(elem => isDescriptor(elem))
