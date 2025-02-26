import type { SomeFunction } from "../types"

/**
 * Check if a value is a function
 */
export const isFunction = (value: unknown): value is SomeFunction => typeof value === "function"
