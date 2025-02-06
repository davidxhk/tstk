import type { Predicate } from "./predicate"

/**
 * A generic predicate that is assignable to any type predicate
 */
export type SomePredicate = Predicate<unknown>
