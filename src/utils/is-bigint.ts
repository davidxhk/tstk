import { isPrimitive } from "."

/**
 * Match bigints
 */
export const isBigInt = (value: unknown): value is bigint => isPrimitive(value, "bigint")
