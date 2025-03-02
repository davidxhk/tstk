import { isEqual } from "."

/**
 * Check if a value is undefined
 */
export const isUndefined = (value: unknown): value is undefined => isEqual(value, undefined)
