import type { Literal } from "./literal"

/**
 * A generic literal that is assignable to any literal wrapper
 */
export type SomeLiteral = Literal<unknown>
