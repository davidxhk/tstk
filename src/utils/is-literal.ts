import type { SomeLiteral } from "../types"
import { Literal } from "."

/**
 * Check if a value is a literal
 */
export const isLiteral = (value: unknown): value is SomeLiteral => value instanceof Literal
