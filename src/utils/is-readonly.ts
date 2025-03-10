import type { $readonly } from "../symbols"
import type { PropertyType } from "../types"
import { isFalse } from "."

/**
 * Match readonly properties
 */
export const isReadonly = <K extends PropertyKey>(value: unknown, key: K): value is PropertyType<K, { [$readonly]: true }> => isFalse(Object.getOwnPropertyDescriptor(value, key)?.writable)
