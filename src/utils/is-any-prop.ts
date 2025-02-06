import type { Property } from "../types"
import { hasProp } from "./has-prop"
import { isAny } from "./is-any"
import { isRecord } from "./is-record"

export const isAnyProp = (value: unknown): value is Property => isRecord(value) && ["type", "optional", "readonly"].some(prop => prop in value) && (!hasProp(value, "type") || isAny(value.type)) && (!hasProp(value, "optional") || value.optional === true) && (!hasProp(value, "readonly") || value.readonly === true)
