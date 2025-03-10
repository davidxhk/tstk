import { isPrimitive } from "."

/**
 * Match booleans
 */
export const isBoolean = (value: unknown): value is boolean => isPrimitive(value, "boolean")
