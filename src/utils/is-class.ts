import type { SomeClass } from "../types"
import { isFunction, isIn, isReadonly } from "."

/**
 * Match classes
 */
export const isClass = (value: unknown): value is SomeClass => isFunction(value) && isIn(value, "prototype") && isReadonly(value, "prototype") && /^class|\[native code\]/.test(Function.prototype.toString.call(value))
