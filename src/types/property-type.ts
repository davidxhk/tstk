import type { Any } from "./any"
import type { Property } from "./property"
import type { Type } from "./type"

/**
 * Construct from T a property type with key K
 */
export type PropertyType<K extends PropertyKey, T extends Any | Property | undefined = undefined> =
  T extends { type: infer T extends Any, optional: true, readonly: true }
    ? { readonly [P in K]?: Type<T> }
    : T extends { type: infer T extends Any, optional: true }
      ? { [P in K]?: Type<T> }
      : T extends { type: infer T extends Any, readonly: true }
        ? { readonly [P in K]: Type<T> }
        : T extends { type: infer T extends Any }
          ? { [P in K]: Type<T> }
          : T extends { optional: true, readonly: true }
            ? { readonly [P in K]?: unknown }
            : T extends { optional: true }
              ? { [P in K]?: unknown }
              : T extends { readonly: true }
                ? { readonly [P in K]: unknown }
                : { [P in K]: T extends Any ? Type<T> : unknown }
