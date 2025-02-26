import type { AnyTuple } from "../types"
import { isAny, isArray } from "."

/**
 * Check if a value is a tuple descriptor
 */
export const isAnyTuple = (value: unknown): value is AnyTuple => isArray(value) && value.every(elem => isAny(elem))
