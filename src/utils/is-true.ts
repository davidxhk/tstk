import { isEqual } from "."

/**
 * Match true
 */
export const isTrue = (value: unknown): value is true => isEqual(value, true)
