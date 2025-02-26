import type { Literal, SomeLiteral } from "."

/**
 * Extract from T its literal value
 */
export type LiteralType<T extends SomeLiteral> = T extends Literal<infer R> ? R : never
