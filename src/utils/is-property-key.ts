import { isNumber, isString, isSymbol } from "."

/**
 * Check if a value is a property key
 */
export const isPropertyKey = (value: unknown): value is PropertyKey => isString(value) || isNumber(value) || isSymbol(value)
