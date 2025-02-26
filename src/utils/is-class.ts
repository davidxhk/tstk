import type { SomeClass } from "../types"
import { hasProp, isFunction, isReadonly } from "."

/**
 * Check if a value is a class
 */
export const isClass = (value: unknown): value is SomeClass => isFunction(value) && hasProp(value, "prototype") && isReadonly(value, "prototype") && /^class|\[native code\]/.test(Function.prototype.toString.call(value))
