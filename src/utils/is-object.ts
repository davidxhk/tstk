/**
 * Check if a value is an object
 */
export const isObject = (value: unknown): value is object => (typeof value === "object" && value !== null) || typeof value === "function"
