import { isEqual } from "."

/**
 * Match null
 */
export const isNull = (value: unknown): value is null => isEqual(value, null)
