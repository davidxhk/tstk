import type { SomeClass } from "../types"
import { hasProp } from "./has-prop"
import { isFunction } from "./is-function"
import { isReadonly } from "./is-readonly"

export const isClass = (value: unknown): value is SomeClass => isFunction(value) && hasProp(value, "prototype") && isReadonly(value, "prototype") && /^class|\[native code\]/.test(Function.prototype.toString.call(value))
