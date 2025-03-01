import type { AsReadonly, Descriptor, Property } from "./types"
import { merge } from "."
import { asProperty } from "./utils"

interface ReadonlyFn {
  /**
   * Define a readonly property
   */
  (): AsReadonly<undefined>

  /**
   * Define a readonly property of T
   */
  <const T extends Property | Descriptor>(type: T): AsReadonly<T>

  /**
   * Define a readonly property of T
   */
  <const T extends Property | Descriptor>(type?: T): AsReadonly<T | undefined>
}

/**
 * Define a readonly property
 */
export const readonly: ReadonlyFn = <const T extends Property | Descriptor>(type?: T): AsReadonly<T | undefined> => merge(asProperty(type), { readonly: true as const })
