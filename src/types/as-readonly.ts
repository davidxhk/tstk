import type { AsProperty, Descriptor, Property } from "."
import type { $readonly } from "../symbols"

/**
 * Construct from T a property descriptor that is marked readonly
 */
export type AsReadonly<T extends Property | Descriptor> = Omit<AsProperty<T>, typeof $readonly> & { [$readonly]: true }
