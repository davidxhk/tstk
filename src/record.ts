import type { Any, KeyType, SomeKey, Type } from "./types"
import { has } from "./has"
import { is } from "./is"
import { getProps, isArray, isRecord } from "./utils"

/**
 * Define a record with properties K of T
 */
export const record = <const K extends SomeKey, const T extends Any>(props: K, type: T) => (value: unknown): value is Record<KeyType<K>, Type<T>> => isRecord(value) && (isArray(props) ? getProps(value).every(prop => props.includes(prop)) && props.every(prop => has(value, prop, type)) : getProps(value).every(prop => is(prop, props) && is(value[prop], type)))
