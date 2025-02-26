import type { Predicate, SomeKey, SomeTuple, Type } from "."

/**
 * Cast a key descriptor K to its corresponding type
 */
export type KeyType<K extends SomeKey> =
  K extends SomeKey
    ? PropertyKey
    : K extends "string" | "number" | "symbol" | Predicate<PropertyKey>
      ? Type<K>
      : K extends SomeTuple
        ? K[number]
        : never
