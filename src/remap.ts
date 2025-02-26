import type { PickOneAs, Remap } from "./types"
import { getProp, getProps, hasProp } from "./utils"

/**
 * Remap T according to M
 */
export const remap = <T extends object, const M extends PickOneAs<T, PropertyKey>>(object: T, mapping: M): Remap<T, M> => Object.fromEntries(getProps(object).map(prop => [hasProp(mapping, prop) ? getProp(mapping, prop) : prop, getProp(object, prop)])) as Remap<T, M>
