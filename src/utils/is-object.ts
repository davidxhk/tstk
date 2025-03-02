import { isNull, isType } from "."

/**
 * Check if a value is an object
 */
export const isObject = (value: unknown): value is object => (isType(value, "object") && !isNull(value)) || isType(value, "function")
