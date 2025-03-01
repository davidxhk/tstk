import type { Property } from "../types"
import { isDescriptor, isIn, isRecord } from "."

/**
 * Check if a value is a property descriptor
 */
export const isProperty = (value: unknown): value is Property => isRecord(value) && (isIn(value, "type") || isIn(value, "optional") || isIn(value, "readonly")) && (!isIn(value, "type") || isDescriptor(value.type)) && (!isIn(value, "optional") || value.optional === true) && (!isIn(value, "readonly") || value.readonly === true)
