import type { Predicate, Tuple } from "."

/**
 * A key descriptor representing a set of keys of T or any key type
 */
export type Key<T> = "string" | "number" | "symbol" | Predicate<PropertyKey> | Tuple<keyof T>
