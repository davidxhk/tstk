import type { Predicate, SomePredicate } from "."

/**
 * Extract from T the type that it checks
 */
export type PredicateType<T extends SomePredicate> = T extends Predicate<infer R> ? R : never
