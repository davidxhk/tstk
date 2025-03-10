import type { SomeRecord } from "../types"
import { isEqual, isNull, isPrimitive } from "."

/**
 * Match records
 */
export const isRecord = (value: unknown): value is SomeRecord => isPrimitive(value, "object") && !isNull(value) && (isEqual(value.constructor, Object) || isPrimitive(value.constructor, "undefined"))
