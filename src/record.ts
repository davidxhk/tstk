import type { Any, AsRecord, SomeKey } from "./types"
import { is } from "."
import { getProps, isArray, isRecord } from "./utils"

/**
 * Define a record with properties K of T
 */
export const record = <const K extends SomeKey, const T extends Any>(props: K, type: T): AsRecord<K, T> => (isArray(props) ? Object.fromEntries(props.map(prop => [prop, type])) : value => isRecord(value) && (getProps(value).every(prop => is(prop, props) && is(value[prop], type)))) as AsRecord<K, T>
