import type { PickOneAs, Remap } from "./types"
import { getValue, isIn, keys } from "./utils"

/**
 * Remap T according to M
 */
export const remap = <T extends object, const M extends PickOneAs<T, PropertyKey>>(object: T, mapping: M): Remap<T, M> => Object.fromEntries(keys(object).map(prop => [isIn(mapping, prop) ? getValue(mapping, prop) : prop, getValue(object, prop)])) as Remap<T, M>
