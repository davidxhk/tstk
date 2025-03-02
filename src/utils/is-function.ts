import type { SomeFunction } from "../types"
import { isType } from "."

/**
 * Check if a value is a function
 */
export const isFunction = (value: unknown): value is SomeFunction => isType(value, "function")
