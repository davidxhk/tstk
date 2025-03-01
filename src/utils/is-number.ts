/**
 * Check if a value is a number
 */
export const isNumber = (value: unknown): value is number => typeof value === "number"
