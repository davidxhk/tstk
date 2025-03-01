import type { KeyDescriptor, KeyType } from "./types"
import { is } from "."
import { getValue, isArray, keys } from "./utils"

/**
 * Omit K from T
 */
export const omit = <T extends object, const K extends KeyDescriptor<T>>(object: T, props: K): Omit<T, KeyType<K>> => Object.fromEntries(keys(object).filter(prop => isArray(props) ? !props.includes(prop) : !is(prop, props)).map(prop => ([prop, getValue(object, prop)]))) as Omit<T, KeyType<K>>
