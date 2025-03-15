import type { SomeFunction } from "../types"
import { isPrimitive } from "."

/**
 * Match functions
 */
export const isFunction = (value: unknown): value is SomeFunction => isPrimitive(value, "function")
