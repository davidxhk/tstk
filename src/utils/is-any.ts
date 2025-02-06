import type { Any } from "../types"
import { isAnyRecord } from "./is-any-record"
import { isAnyTuple } from "./is-any-tuple"
import { isLiteral } from "./is-literal"

export const isAny = (value: unknown): value is Any => ["string", "number", "bigint", "boolean", "symbol", "function"].includes(typeof value) || value === null || isLiteral(value) || isAnyRecord(value) || isAnyTuple(value)
