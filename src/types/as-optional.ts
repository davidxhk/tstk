import type { AsProperty, Descriptor, Property } from "."

/**
 * Construct from T a property descriptor that is marked optional
 */
export type AsOptional<T extends Property | Descriptor | undefined> = Omit<AsProperty<T>, "optional"> & { optional: true }
