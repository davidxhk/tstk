import type { SomeLiteral } from "."
import type { Literal } from "../utils"

/**
 * Extract from T its literal value
 */
export type LiteralType<T extends SomeLiteral> = T extends Literal<infer R> ? R : never
