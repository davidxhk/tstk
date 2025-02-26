import type { PropertyType } from "../types"

/**
 * Check if a property is readonly
 */
export const isReadonly = <K extends PropertyKey>(value: unknown, key: K): value is PropertyType<K, { readonly: true }> => Object.getOwnPropertyDescriptor(value, key)?.writable === false
