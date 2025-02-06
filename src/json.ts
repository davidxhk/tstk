import type { Json } from "./types"
import { array } from "./array"
import { is } from "./is"
import { record } from "./record"
import { union } from "./union"

/**
 * Check if a value is JSON
 */
export const json = (value: unknown): value is Json => is(value, union("string", "number", "boolean", array(json), record("string", json), "null"))
