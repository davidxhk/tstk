import type { Any, AsProperty, Property } from "../types"
import { isAny, isProperty } from "."

interface PropertyFn {
  /**
   * Define a property descriptor
   */
  (): AsProperty<undefined>

  /**
   * Cast T to a property descriptor
   */
  <const T extends Any | Property>(type: T): AsProperty<T>

  /**
   * Cast T to a property descriptor
   */
  <const T extends Any | Property>(type?: T): AsProperty<T | undefined>
}

/**
 * Cast T to a property descriptor
 */
export const property: PropertyFn = <const T extends Any | Property>(type?: T): AsProperty<T | undefined> => isProperty(type) ? type : isAny(type) ? { type } : {}
