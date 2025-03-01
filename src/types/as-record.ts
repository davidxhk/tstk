import type { Descriptor, Predicate, SomeKey, Tuple, Type } from "."

/**
 * Construct from K and T a record type
 */
export type AsRecord<K extends SomeKey, T extends Descriptor> =
  SomeKey extends K
    ? Record<PropertyKey, T>
    : K extends Tuple<PropertyKey>
      ? Record<K[number], T>
      : K extends "string" | "number" | "symbol" | Predicate<PropertyKey>
        ? (value: unknown) => value is Record<Type<K>, Type<T>>
        : never
