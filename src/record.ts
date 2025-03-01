import type { AsRecord, Descriptor, SomeKey } from "./types"
import { is } from "."
import { isArray, isRecord, keys } from "./utils"

/**
 * Define a record with properties K of T
 */
export const record = <const K extends SomeKey, const T extends Descriptor>(props: K, type: T): AsRecord<K, T> => (isArray(props) ? Object.fromEntries(props.map(prop => [prop, type])) : value => isRecord(value) && (keys(value).every(prop => is(prop, props) && is(value[prop], type)))) as AsRecord<K, T>
