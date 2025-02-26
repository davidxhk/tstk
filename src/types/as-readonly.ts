import type { Any, AsProperty, Property } from "."

/**
 * Construct from T a property descriptor that is marked readonly
 */
export type AsReadonly<T extends Any | Property | undefined> = Omit<AsProperty<T>, "readonly"> & { readonly: true }
