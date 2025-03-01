import type { AsProperty, Descriptor, Property } from "../types"
import { isDescriptor, isProperty } from "."

interface AsPropertyFn {
  /**
   * Define a property descriptor
   */
  (): AsProperty<undefined>

  /**
   * Cast T to a property descriptor
   */
  <const T extends Property | Descriptor>(type: T): AsProperty<T>

  /**
   * Cast T to a property descriptor
   */
  <const T extends Property | Descriptor>(type?: T): AsProperty<T | undefined>
}

/**
 * Cast T to a property descriptor
 */
export const asProperty: AsPropertyFn = <const T extends Property | Descriptor>(type?: T): AsProperty<T | undefined> => isProperty(type) ? type : isDescriptor(type) ? { type } : {}
