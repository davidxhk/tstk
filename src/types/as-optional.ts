import type { AsProperty, Descriptor, Property } from "."
import type { $optional } from "../symbols"

/**
 * Construct from T a property descriptor that is marked optional
 */
export type AsOptional<T extends Property | Descriptor> = Omit<AsProperty<T>, typeof $optional> & { [$optional]: true }
