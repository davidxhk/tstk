import type { AsProperty, Descriptor, Property } from "."

/**
 * Construct from T a property descriptor that is marked readonly
 */
export type AsReadonly<T extends Property | Descriptor | undefined> = Omit<AsProperty<T>, "readonly"> & { readonly: true }
