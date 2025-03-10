import { isEqual } from "."

/**
 * Match undefined
 */
export const isUndefined = (value: unknown): value is undefined => isEqual(value, undefined)
