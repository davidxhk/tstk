import type { Descriptor, Property, PropertyType } from "./types"
import { is } from "."
import { $optional, $readonly, $type } from "./symbols"
import { isDescriptor, isIn, isObject, isProperty, isReadonly } from "./utils"

interface HasPredicate {
  /**
   * Check if a value has K
   */
  <const K extends PropertyKey>(value: unknown, prop: K): value is PropertyType<K>

  /**
   * Check if a value has K of T, allowing extra properties if exact is `false`
   */
  <const K extends PropertyKey, const T extends Property>(value: unknown, prop: K, type: T, exact?: boolean): value is PropertyType<K, T>

  /**
   * Check if a value has K of T, allowing extra properties if exact is `false`
   */
  <const K extends PropertyKey, const T extends Descriptor>(value: unknown, prop: K, type: T, exact?: boolean): value is PropertyType<K, T>
}

/**
 * Check if a value has K of T
 */
export const has: HasPredicate = (value: unknown, prop: PropertyKey, type?: Property | Descriptor, exact = true): value is any => isObject(value) && (isIn(value, prop) ? isProperty(type) ? (!isIn(type, $type) || is(value[prop], type[$type], exact)) && (!isIn(type, $readonly) || isReadonly(value, prop)) : (!isDescriptor(type) || is(value[prop], type, exact)) : isProperty(type) && isIn(type, $optional))
