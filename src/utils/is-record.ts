import type { SomeRecord } from "../types"

/**
 * Check if a value is a record
 */
export const isRecord = (value: unknown): value is SomeRecord => typeof value === "object" && value !== null && (value.constructor === Object || value.constructor === undefined)
