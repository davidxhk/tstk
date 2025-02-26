import type { Any } from "../types"
import { isAnyRecord, isAnyTuple, isLiteral } from "."

/**
 * Check if a value is a type descriptor
 */
export const isAny = (value: unknown): value is Any => ["string", "number", "bigint", "boolean", "symbol", "function"].includes(typeof value) || value === null || isLiteral(value) || isAnyRecord(value) || isAnyTuple(value)
