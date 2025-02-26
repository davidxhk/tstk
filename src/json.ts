import type { Json } from "./types"
import { array, is, record, union } from "."

/**
 * Check if a value is a JSON value
 */
export const json = (value: unknown): value is Json => is(value, union("string", "number", "boolean", array(json), record("string", json), "null"))
