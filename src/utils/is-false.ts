import { isEqual } from "."

/**
 * Match false
 */
export const isFalse = (value: unknown): value is false => isEqual(value, false)
