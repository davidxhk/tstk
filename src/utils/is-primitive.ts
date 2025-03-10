import type { PrimitiveType } from "../types"
import { isEqual } from "."

/**
 * Match primitive T
 */
export const isPrimitive = <const T extends "string" | "number" | "bigint" | "boolean" | "symbol" | "object" | "function" | "undefined">(value: unknown, type: T): value is PrimitiveType<T> => isEqual(typeof value, type)
