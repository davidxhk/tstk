import type { Any, Property, PropertyType } from "./types"
import { is } from "./is"
import { asProperty, hasProp, isAny, isObject, isReadonly } from "./utils"

/**
 * Check if a value has K of T
 */
export function has<const K extends PropertyKey, const T extends Any | Property>(value: unknown, prop: K, type?: T): value is PropertyType<K, T | undefined> {
  const propType = asProperty(type)

  if (!isObject(value)) {
    return false
  }

  if (!hasProp(value, prop)) {
    return hasProp(propType, "optional") && propType.optional === true
  }

  if (hasProp(propType, "type") && isAny(propType.type) && !is(value[prop], propType.type)) {
    return false
  }

  if (hasProp(propType, "readonly") && propType.readonly === true && !isReadonly(value, prop)) {
    return false
  }

  return true
}
