import type { Property } from "../types"
import { isDescriptor, isIn, isRecord, isTrue } from "."
import { $optional, $readonly, $type } from "../symbols"

/**
 * Match property descriptors
 */
export const isProperty = (value: unknown): value is Property => isRecord(value) && (isIn(value, $type) || isIn(value, $optional) || isIn(value, $readonly)) && (!isIn(value, $type) || isDescriptor(value[$type])) && (!isIn(value, $optional) || isTrue(value[$optional])) && (!isIn(value, $readonly) || isTrue(value[$readonly]))
