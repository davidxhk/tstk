import type { Literal } from "./literal"

/**
 * A catch-all type to which any literal wrapper is assignable
 */
export type SomeLiteral = Literal<unknown>
