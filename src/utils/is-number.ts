import { isPrimitive } from "."

/**
 * Match numbers
 */
export const isNumber = (value: unknown): value is number => isPrimitive(value, "number")
