import type { AsOptional, Descriptor, Property } from "./types"
import { merge } from "."
import { $optional, $type } from "./symbols"
import { isDescriptor, isProperty } from "./utils"

interface OptionalProperty {
  /**
   * Define an optional property
   */
  (): { [$optional]: true }

  /**
   * Define an optional property of T
   */
  <const T extends Property>(type: T): AsOptional<T>

  /**
   * Define an optional property of T
   */
  <const T extends Descriptor>(type: T): AsOptional<T>
}

/**
 * Define an optional property
 */
export const optional: OptionalProperty = (type?: Property | Descriptor) => isProperty(type) ? merge(type, { [$optional]: true as const }) : isDescriptor(type) ? { [$type]: type, [$optional]: true as const } : { [$optional]: true as const }
