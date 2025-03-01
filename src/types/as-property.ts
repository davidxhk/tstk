import type { Descriptor, Property } from "."

/**
 * Construct from T a normalized property descriptor
 */
export type AsProperty<T extends Property | Descriptor | undefined> =
  T extends { type: infer T extends Descriptor, optional: true, readonly: true }
    ? { type: T, optional: true, readonly: true }
    : T extends { type: infer T extends Descriptor, optional: true }
      ? { type: T, optional: true }
      : T extends { type: infer T extends Descriptor, readonly: true }
        ? { type: T, readonly: true }
        : T extends { type: infer T extends Descriptor }
          ? { type: T }
          : T extends { optional: true, readonly: true }
            ? { optional: true, readonly: true }
            : T extends { optional: true }
              ? { optional: true }
              : T extends { readonly: true }
                ? { readonly: true }
                : T extends Descriptor
                  ? { type: T }
                  : { type?: Descriptor, optional?: true, readonly?: true }
