import type { Predicate } from "./predicate"
import type { Tuple } from "./tuple"

/**
 * A key descriptor representing a set of keys of T or any key type
 */
export type Key<T> = "string" | "number" | "symbol" | Predicate<PropertyKey> | Tuple<keyof T>
