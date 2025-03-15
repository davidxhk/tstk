import { isNumber, isString, isSymbol } from "."

/**
 * Match property keys
 */
export const isPropertyKey = (value: unknown): value is PropertyKey => isString(value) || isNumber(value) || isSymbol(value)
