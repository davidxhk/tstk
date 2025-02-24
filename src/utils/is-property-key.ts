/**
 * Check if a value can be a property key
 */
export const isPropertyKey = (value: unknown): value is PropertyKey => ["string", "number", "symbol"].includes(typeof value)
