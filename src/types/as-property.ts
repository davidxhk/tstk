import type { Any, Property } from "."

/**
 * Construct from T a normalized property descriptor
 */
export type AsProperty<T extends Any | Property | undefined> =
  T extends { type: infer T extends Any, optional: true, readonly: true }
    ? { type: T, optional: true, readonly: true }
    : T extends { type: infer T extends Any, optional: true }
      ? { type: T, optional: true }
      : T extends { type: infer T extends Any, readonly: true }
        ? { type: T, readonly: true }
        : T extends { type: infer T extends Any }
          ? { type: T }
          : T extends { optional: true, readonly: true }
            ? { optional: true, readonly: true }
            : T extends { optional: true }
              ? { optional: true }
              : T extends { readonly: true }
                ? { readonly: true }
                : T extends Any
                  ? { type: T }
                  : { type?: Any, optional?: true, readonly?: true }
