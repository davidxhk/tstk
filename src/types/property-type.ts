import type { Descriptor, Property, Type } from "."

/**
 * Construct from T a property type with key K
 */
export type PropertyType<K extends PropertyKey, T extends Property | Descriptor | undefined = undefined> =
  T extends { type: infer T extends Descriptor, optional: true, readonly: true }
    ? { readonly [P in K]?: Type<T> }
    : T extends { type: infer T extends Descriptor, optional: true }
      ? { [P in K]?: Type<T> }
      : T extends { type: infer T extends Descriptor, readonly: true }
        ? { readonly [P in K]: Type<T> }
        : T extends { type: infer T extends Descriptor }
          ? { [P in K]: Type<T> }
          : T extends { optional: true, readonly: true }
            ? { readonly [P in K]?: unknown }
            : T extends { optional: true }
              ? { [P in K]?: unknown }
              : T extends { readonly: true }
                ? { readonly [P in K]: unknown }
                : { [P in K]: T extends Descriptor ? Type<T> : unknown }
