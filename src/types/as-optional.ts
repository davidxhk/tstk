import type { Any } from "./any"
import type { AsProperty } from "./as-property"
import type { Property } from "./property"

/**
 * Construct from T a property descriptor that is marked optional
 */
export type AsOptional<T extends Any | Property | undefined> = Omit<AsProperty<T>, "optional"> & { optional: true }
