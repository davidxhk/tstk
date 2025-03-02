import type { SomeLiteral } from "../types"
import { isInstance, Literal } from "."

/**
 * Check if a value is a literal
 */
export const isLiteral = (value: unknown): value is SomeLiteral => isInstance(value, Literal)
