import type { Key, KeyType } from "./types"
import { is } from "./is"
import { getProp, getProps, isArray } from "./utils"

/**
 * Omit K from T
 */
export const omit = <T extends object, const K extends Key<T>>(object: T, props: K): Omit<T, KeyType<K>> => Object.fromEntries(getProps(object).filter(prop => isArray(props) ? !props.includes(prop) : !is(prop, props)).map(prop => ([prop, getProp(object, prop)]))) as Omit<T, KeyType<K>>
