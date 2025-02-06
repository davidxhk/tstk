import type { Predicate } from "./predicate"
import type { SomeKey } from "./some-key"
import type { SomeTuple } from "./some-tuple"
import type { Type } from "./type"

/**
 * Cast a key descriptor K to its corresponding type
 */
export type KeyType<K extends SomeKey> =
  K extends "string" | "number" | "symbol" | Predicate<PropertyKey>
    ? Type<K>
    : K extends SomeTuple
      ? K[number]
      : never
