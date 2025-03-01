import type { Predicate, SomeKey, SomeTuple, Type } from "."

/**
 * Cast a key descriptor K to its corresponding type
 */
export type KeyType<K extends SomeKey> =
  SomeKey extends K
    ? PropertyKey
    : K extends SomeTuple
      ? K[number]
      : K extends "string" | "number" | "symbol" | Predicate<PropertyKey>
        ? Type<K>
        : never
