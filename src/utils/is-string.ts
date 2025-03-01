/**
 * Check if a value is a string
 */
export const isString = (value: unknown): value is string => typeof value === "string"
