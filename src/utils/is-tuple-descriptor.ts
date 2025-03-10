import type { TupleDescriptor } from "../types"
import { isArray, isDescriptor } from "."

/**
 * Match tuple descriptors
 */
export const isTupleDescriptor = (value: unknown): value is TupleDescriptor => isArray(value) && value.every(elem => isDescriptor(elem))
