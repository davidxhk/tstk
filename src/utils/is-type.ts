import type { PrimitiveType } from "../types"
import { isEqual } from "."

/**
 * Check if a value is type T
 */
export const isType = <const T extends "string" | "number" | "bigint" | "boolean" | "symbol" | "object" | "function" | "undefined">(value: unknown, type: T): value is PrimitiveType<T> => isEqual(typeof value, type)
