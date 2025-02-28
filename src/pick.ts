import type { Key, KeyType } from "./types"
import { is } from "."
import { getProp, getProps, isArray } from "./utils"

/**
 * Pick K from T
 */
export const pick = <T extends object, const K extends Key<T>>(object: T, props: K): Pick<T, KeyType<K> & keyof T> => Object.fromEntries(getProps(object).filter(prop => isArray(props) ? props.includes(prop) : is(prop, props)).map(prop => ([prop, getProp(object, prop)]))) as Pick<T, KeyType<K> & keyof T>
