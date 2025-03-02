import type { SomeRecord } from "../types"
import { isEqual, isNull, isType } from "."

/**
 * Check if a value is a record
 */
export const isRecord = (value: unknown): value is SomeRecord => isType(value, "object") && !isNull(value) && (isEqual(value.constructor, Object) || isType(value.constructor, "undefined"))
