import type { Descriptor, Type } from "./types"
import { is } from "."
import { isArray } from "./utils"

/**
 * Define an array type where every element matches T
 */
export const array = <const T extends Descriptor>(type: T) => (value: unknown): value is Type<T>[] => isArray(value) && value.every(elem => is(elem, type))
