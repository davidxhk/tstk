import type { AnyRecord } from "../types"
import { getProps, isAny, isPropertyKey, isRecord } from "."

/**
 * Check if a value is a record descriptor
 */
export const isAnyRecord = (value: unknown): value is AnyRecord => isRecord(value) && getProps(value).every(prop => isPropertyKey(prop) && isAny(value[prop]))
