import type { Literal } from "."

/**
 * A catch-all type to which any literal wrapper is assignable
 */
export type SomeLiteral = Literal<unknown>
