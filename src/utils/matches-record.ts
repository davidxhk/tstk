import type { RecordDescriptor, RecordType } from "../types"
import { isFalse, isIn, isObject, keys } from "."
import { has } from "../has"

/**
 * Check if a value matches T
 */
export const matchesRecord = <T extends RecordDescriptor>(value: unknown, type: T, exact: boolean): value is RecordType<T> => isObject(value) && keys(type).every(prop => has(value, prop, type[prop], exact)) && (isFalse(exact) || keys(value).every(prop => isIn(type, prop)))
