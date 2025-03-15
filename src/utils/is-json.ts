import type { Json } from "../types"
import { isArray, isBoolean, isNull, isNumber, isRecord, isString, keys } from "."

/**
 * Match JSON values
 */
export const isJson = (value: unknown): value is Json => isString(value) || isNumber(value) || isBoolean(value) || isNull(value) || (isArray(value) && value.every(elem => isJson(elem))) || (isRecord(value) && keys(value).every(prop => isString(prop) && isJson(value[prop])))
