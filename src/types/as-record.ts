import type { Any, Predicate, SomeKey, Tuple, Type } from "."

/**
 * Construct from K and T a mapped record type
 */
export type AsRecord<K extends SomeKey, T extends Any> =
  SomeKey extends K
    ? Record<PropertyKey, T>
    : K extends "string" | "number" | "symbol" | Predicate<PropertyKey>
      ? (value: unknown) => value is Record<Type<K>, Type<T>>
      : K extends Tuple<PropertyKey>
        ? Record<K[number], T>
        : never
