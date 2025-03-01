import type { AsOptional, Descriptor, Property } from "./types"
import { merge } from "."
import { asProperty } from "./utils"

interface OptionalFn {
  /**
   * Define an optional property
   */
  (): AsOptional<undefined>

  /**
   * Define an optional property of T
   */
  <const T extends Property | Descriptor>(type: T): AsOptional<T>

  /**
   * Define an optional property of T
   */
  <const T extends Property | Descriptor>(type?: T): AsOptional<T | undefined>
}

/**
 * Define an optional property
 */
export const optional: OptionalFn = <const T extends Property | Descriptor>(type?: T): AsOptional<T | undefined> => merge(asProperty(type), { optional: true as const })
