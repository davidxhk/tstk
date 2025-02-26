import type { Property } from "../types"
import { hasProp, isAny, isRecord } from "."

/**
 * Check if a value is a property descriptor
 */
export const isProperty = (value: unknown): value is Property => isRecord(value) && ["type", "optional", "readonly"].some(prop => prop in value) && (!hasProp(value, "type") || isAny(value.type)) && (!hasProp(value, "optional") || value.optional === true) && (!hasProp(value, "readonly") || value.readonly === true)
