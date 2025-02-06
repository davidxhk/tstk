import type { Literal } from "./literal"
import type { SomeLiteral } from "./some-literal"

/**
 * Extract from T its literal value
 */
export type LiteralType<T extends SomeLiteral> = T extends Literal<infer R> ? R : never
