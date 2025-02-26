import type { Any, AsOptional, Property } from "./types"
import { merge } from "."
import { property } from "./utils"

interface OptionalFn {
  /**
   * Define an optional property
   */
  (): AsOptional<undefined>

  /**
   * Define an optional property of T
   */
  <const T extends Any | Property>(type: T): AsOptional<T>

  /**
   * Define an optional property of T
   */
  <const T extends Any | Property>(type?: T): AsOptional<T | undefined>
}

/**
 * Define an optional property
 */
export const optional: OptionalFn = <const T extends Any | Property>(type?: T): AsOptional<T | undefined> => merge(property(type), { optional: true as const })
