import type { Descriptor } from "../types"
import { isBigInt, isBoolean, isClass, isFunction, isLiteral, isNull, isNumber, isRecordDescriptor, isString, isSymbol, isTupleDescriptor } from "."

/**
 * Match type descriptors
 */
export const isDescriptor = (value: unknown): value is Descriptor => isString(value) || isNumber(value) || isBigInt(value) || isBoolean(value) || isSymbol(value) || isClass(value) || isLiteral(value) || isFunction(value) || isRecordDescriptor(value) || isTupleDescriptor(value) || isNull(value)
