/**
 * Check if a value is a symbol
 */
export const isSymbol = (value: unknown): value is symbol => typeof value === "symbol"
