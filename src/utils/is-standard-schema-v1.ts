import type { StandardSchemaV1 } from "../types"
import { isEqual, isIn, isObject } from "."

/**
 * Check if a value is a v1 standard schema
 */
export const isStandardSchemaV1 = (value: unknown): value is StandardSchemaV1 => isObject(value) && isIn(value, "~standard") && isObject(value["~standard"]) && isIn(value["~standard"], "version") && isEqual(value["~standard"].version, 1)
