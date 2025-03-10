import type { SomeLiteral } from "../types"
import { isInstance, Literal } from "."

/**
 * Match Literal instances
 */
export const isLiteral = (value: unknown): value is SomeLiteral => isInstance(value, Literal)
