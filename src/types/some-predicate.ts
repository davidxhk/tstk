import type { Predicate } from "./predicate"

/**
 * A catch-all type to which any type predicate is assignable
 */
export type SomePredicate = Predicate<unknown>
