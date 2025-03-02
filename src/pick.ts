import type { KeyDescriptor, KeyType } from "./types"
import { is } from "."
import { get, isArray, keys } from "./utils"

/**
 * Pick K from T
 */
export const pick = <T extends object, const K extends KeyDescriptor<T>>(object: T, props: K): Pick<T, KeyType<K> & keyof T> => Object.fromEntries(keys(object).filter(prop => isArray(props) ? props.includes(prop) : is(prop, props)).map(prop => ([prop, get(object, prop)]))) as Pick<T, KeyType<K> & keyof T>
