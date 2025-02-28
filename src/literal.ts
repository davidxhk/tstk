import { Literal } from "./utils"

/**
 * Define a literal type
 */
export const literal = <const T>(type: T): Literal<T> => new Literal(type)
