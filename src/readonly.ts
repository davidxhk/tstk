import type { Any, AsReadonly, Property } from "./types"
import { merge } from "./merge"
import { asProperty } from "./utils"

interface ReadonlyFn {
  /**
   * Define a readonly property
   */
  (): AsReadonly<undefined>

  /**
   * Define a readonly property of T
   */
  <const T extends Any | Property>(type: T): AsReadonly<T>

  /**
   * Define a readonly property of T
   */
  <const T extends Any | Property>(type?: T): AsReadonly<T | undefined>
}

/**
 * Define a readonly property
 */
export const readonly: ReadonlyFn = <const T extends Any | Property>(type?: T): AsReadonly<T | undefined> => merge(asProperty(type), { readonly: true as const })
