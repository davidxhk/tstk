import type { AnyRecord } from "../types"
import { getProps } from "./get-props"
import { isAny } from "./is-any"
import { isPropertyKey } from "./is-property-key"
import { isRecord } from "./is-record"

export const isAnyRecord = (value: unknown): value is AnyRecord => isRecord(value) && getProps(value).every(prop => isPropertyKey(prop) && isAny(value[prop]))
