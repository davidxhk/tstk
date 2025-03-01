import type { Predicate, Tuple } from "."

/**
 * A type descriptor representing a set of keys of T or any key type
 */
export type KeyDescriptor<T> = "string" | "number" | "symbol" | Predicate<PropertyKey> | Tuple<keyof T>
