import type { Any, AsProperty, Property } from "../types"
import { isAny } from "./is-any"
import { isAnyProp } from "./is-any-prop"

interface AsPropertyFn {
  (): AsProperty<undefined>
  <const T extends Any | Property>(type: T): AsProperty<T>
  <const T extends Any | Property>(type?: T): AsProperty<T | undefined>
}

export const asProperty: AsPropertyFn = <const T extends Any | Property>(type?: T): AsProperty<T | undefined> => isAnyProp(type) ? type : isAny(type) ? { type } : {}
