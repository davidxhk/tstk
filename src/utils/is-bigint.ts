/**
 * Check if a value is a bigint
 */
export const isBigInt = (value: unknown): value is bigint => typeof value === "bigint"
