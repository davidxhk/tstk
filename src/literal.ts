import { Literal } from "./utils"

/**
 * Specify a literal value
 */
export const literal = <const T>(value: T): Literal<T> => new Literal(value)
