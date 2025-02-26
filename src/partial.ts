import type { AnyRecord, PartialRecord } from "./types"
import { optional } from "."
import { getProps } from "./utils"

/**
 * Define a record type with optional properties only
 */
export const partial = <const T extends AnyRecord>(record: T): PartialRecord<T> => Object.fromEntries(getProps(record).map(prop => [prop, optional(record[prop])])) as PartialRecord<T>
