/**
 * Check if a value is a property key
 */
export const isPropertyKey = (value: unknown): value is PropertyKey => ["string", "number", "symbol"].includes(typeof value)
