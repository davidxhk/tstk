import { isPrimitive } from "./is-primitive"

/**
 * Match symbols
 */
export const isSymbol = (value: unknown): value is symbol => isPrimitive(value, "symbol")
