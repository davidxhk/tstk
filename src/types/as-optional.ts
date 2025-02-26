import type { Any, AsProperty, Property } from "."

/**
 * Construct from T a property descriptor that is marked optional
 */
export type AsOptional<T extends Any | Property | undefined> = Omit<AsProperty<T>, "optional"> & { optional: true }
