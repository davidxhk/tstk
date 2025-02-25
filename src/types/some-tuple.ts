import type { Tuple } from "./tuple"

/**
 * A catch-all type to which any tuple type is assignable
 */
export type SomeTuple = Tuple<unknown>
