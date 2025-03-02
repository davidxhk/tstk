import { isType } from "."

/**
 * Check if a value is a number
 */
export const isNumber = (value: unknown): value is number => isType(value, "number")
