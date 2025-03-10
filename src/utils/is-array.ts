import type { SomeArray } from "../types"

/**
 * Match arrays
 */
export const isArray = (value: unknown): value is SomeArray => Array.isArray(value)
