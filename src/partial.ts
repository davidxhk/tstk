import type { AsPartial, RecordDescriptor } from "./types"
import { optional } from "."
import { keys } from "./utils"

/**
 * Convert all properties of T to optional
 */
export const partial = <const T extends RecordDescriptor>(record: T): AsPartial<T> => Object.fromEntries(keys(record).map(prop => [prop, optional(record[prop])])) as AsPartial<T>
