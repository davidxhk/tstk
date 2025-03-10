import type { Descriptor, Property, PropertyType } from "./types"
import { is } from "."
import { $optional, $readonly, $type } from "./symbols"
import { isDescriptor, isIn, isObject, isProperty, isReadonly } from "./utils"

interface HasPredicate {
  /**
   * Match objects with K
   */
  <const K extends PropertyKey>(value: unknown, prop: K): value is PropertyType<K>

  /**
   * Match objects with K of T
   */
  <const K extends PropertyKey, const T extends Property>(value: unknown, prop: K, type: T, exact?: boolean): value is PropertyType<K, T>

  /**
   * Match objects with K of T
   */
  <const K extends PropertyKey, const T extends Descriptor>(value: unknown, prop: K, type: T, exact?: boolean): value is PropertyType<K, T>
}

/**
 * Match objects with K of T
 */
export const has: HasPredicate = (value: unknown, prop: PropertyKey, type?: Property | Descriptor, exact = true): value is any => isObject(value) && (isIn(value, prop) ? isProperty(type) ? (!isIn(type, $type) || is(value[prop], type[$type], exact)) && (!isIn(type, $readonly) || isReadonly(value, prop)) : (!isDescriptor(type) || is(value[prop], type, exact)) : isProperty(type) && isIn(type, $optional))
