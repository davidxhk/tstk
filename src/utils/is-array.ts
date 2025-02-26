import type { SomeArray } from "../types"

/**
 * Check if a value is an array
 */
export const isArray = (value: unknown): value is SomeArray => Array.isArray(value)
