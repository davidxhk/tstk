import type { Descriptor, Property, PropertyType } from "./types"
import { is } from "."
import { asProperty, isDescriptor, isIn, isObject, isReadonly } from "./utils"

/**
 * Check if a value has K of T
 */
export function has<const K extends PropertyKey>(value: unknown, prop: K): value is PropertyType<K>
export function has<const K extends PropertyKey, const T extends Property | Descriptor>(value: unknown, prop: K, type: T): value is PropertyType<K, T>
export function has<const K extends PropertyKey, const T extends Property | Descriptor>(value: unknown, prop: K, type?: T): value is PropertyType<K, T | undefined> {
  const propType = asProperty(type)

  if (!isObject(value)) {
    return false
  }

  if (!isIn(value, prop)) {
    return isIn(propType, "optional") && propType.optional === true
  }

  if (isIn(propType, "type") && isDescriptor(propType.type) && !is(value[prop], propType.type)) {
    return false
  }

  if (isIn(propType, "readonly") && propType.readonly === true && !isReadonly(value, prop)) {
    return false
  }

  return true
}
