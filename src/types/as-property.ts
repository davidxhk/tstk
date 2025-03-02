import type { Descriptor, Property } from "."
import type { $optional, $readonly, $type } from "../symbols"

/**
 * Construct from T a normalized property descriptor
 */
export type AsProperty<T extends Property | Descriptor> =
  T extends { [$type]: infer T extends Descriptor, [$optional]: true, [$readonly]: true }
    ? { [$type]: T, [$optional]: true, [$readonly]: true }
    : T extends { [$type]: infer T extends Descriptor, [$optional]: true, [$readonly]?: never }
      ? { [$type]: T, [$optional]: true }
      : T extends { [$type]: infer T extends Descriptor, [$optional]?: never, [$readonly]: true }
        ? { [$type]: T, [$readonly]: true }
        : T extends { [$type]: infer T extends Descriptor, [$optional]?: never, [$readonly]?: never }
          ? { [$type]: T }
          : T extends { [$type]?: never, [$optional]: true, [$readonly]: true }
            ? { [$optional]: true, [$readonly]: true }
            : T extends { [$type]?: never, [$optional]: true, [$readonly]?: never }
              ? { [$optional]: true }
              : T extends { [$type]?: never, [$optional]?: never, [$readonly]: true }
                ? { [$readonly]: true }
                : T extends Descriptor ? { [$type]: T } : never
