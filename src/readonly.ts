import type { AsReadonly, Descriptor, Property } from "./types"
import { merge } from "."
import { $readonly, $type } from "./symbols"
import { isDescriptor, isProperty } from "./utils"

interface ReadonlyProperty {
  /**
   * Define a readonly property
   */
  (): { [$readonly]: true }

  /**
   * Define a readonly property of T
   */
  <const T extends Property>(type: T): AsReadonly<T>

  /**
   * Define a readonly property of T
   */
  <const T extends Descriptor>(type: T): AsReadonly<T>
}

/**
 * Define a readonly property
 */
export const readonly: ReadonlyProperty = (type?: Property | Descriptor) => isProperty(type) ? merge(type, { [$readonly]: true as const }) : isDescriptor(type) ? { [$type]: type, [$readonly]: true as const } : { [$readonly]: true as const }
