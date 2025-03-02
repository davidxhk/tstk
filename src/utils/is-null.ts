import { isEqual } from "."

/**
 * Check if a value is null
 */
export const isNull = (value: unknown): value is null => isEqual(value, null)
