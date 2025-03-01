import type { Descriptor } from "../types"
import { isBigInt, isBoolean, isClass, isFunction, isLiteral, isNumber, isRecordDescriptor, isString, isSymbol, isTupleDescriptor } from "."

/**
 * Check if a value is a type descriptor
 */
export const isDescriptor = (value: unknown): value is Descriptor => isString(value) || isNumber(value) || isBigInt(value) || isBoolean(value) || isSymbol(value) || isClass(value) || isLiteral(value) || isFunction(value) || isRecordDescriptor(value) || isTupleDescriptor(value) || value === null
