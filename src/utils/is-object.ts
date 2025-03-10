import { isNull, isPrimitive } from "."

/**
 * Match objects
 */
export const isObject = (value: unknown): value is object => (isPrimitive(value, "object") && !isNull(value)) || isPrimitive(value, "function")
