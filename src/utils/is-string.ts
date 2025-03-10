import { isPrimitive } from "."

/**
 * Match strings
 */
export const isString = (value: unknown): value is string => isPrimitive(value, "string")
