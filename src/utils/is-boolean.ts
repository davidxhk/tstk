/**
 * Check if a value is a boolean
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean"
