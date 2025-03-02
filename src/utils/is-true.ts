import { isEqual } from "."

/**
 * Check if a value is true
 */
export const isTrue = (value: unknown): value is true => isEqual(value, true)
