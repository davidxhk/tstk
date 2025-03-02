import { isType } from "./is-type"

/**
 * Check if a value is a symbol
 */
export const isSymbol = (value: unknown): value is symbol => isType(value, "symbol")
