import { isEqual } from "."

/**
 * Check if a value is false
 */
export const isFalse = (value: unknown): value is false => isEqual(value, false)
