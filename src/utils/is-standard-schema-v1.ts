import type { StandardSchemaV1 } from "../types"
import { isEqual, isIn, isObject } from "."

/**
 * Match v1 standard schemas
 */
export const isStandardSchemaV1 = (value: unknown): value is StandardSchemaV1 => isObject(value) && isIn(value, "~standard") && isObject(value["~standard"]) && isIn(value["~standard"], "version") && isEqual(value["~standard"].version, 1)
