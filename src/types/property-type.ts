import type { Descriptor, Property, Type } from "."
import type { $optional, $readonly, $type } from "../symbols"

/**
 * Construct from T a property type with key K
 */
export type PropertyType<K extends PropertyKey, T extends Property | Descriptor | undefined = undefined> =
  T extends { [$type]: infer T extends Descriptor, [$optional]: true, [$readonly]: true }
    ? { readonly [P in K]?: Type<T> }
    : T extends { [$type]: infer T extends Descriptor, [$optional]: true, [$readonly]?: never }
      ? { [P in K]?: Type<T> }
      : T extends { [$type]: infer T extends Descriptor, [$optional]?: never, [$readonly]: true }
        ? { readonly [P in K]: Type<T> }
        : T extends { [$type]: infer T extends Descriptor, [$optional]?: never, [$readonly]?: never }
          ? { [P in K]: Type<T> }
          : T extends { [$type]?: never, [$optional]: true, [$readonly]: true }
            ? { readonly [P in K]?: unknown }
            : T extends { [$type]?: never, [$optional]: true, [$readonly]?: never }
              ? { [P in K]?: unknown }
              : T extends { [$type]?: never, [$optional]?: never, [$readonly]: true }
                ? { readonly [P in K]: unknown }
                : { [P in K]: T extends Descriptor ? Type<T> : unknown }
