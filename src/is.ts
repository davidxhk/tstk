import type { Descriptor, Type } from "./types"
import { assert } from "."
import { $value } from "./symbols"
import { isAny, isArray, isBigInt, isBoolean, isClass, isEqual, isFunction, isInstance, isLiteral, isMatch, isNull, isNumber, isObject, isRecord, isString, isSymbol, isUndefined } from "./utils"

/**
 * Check if a value is T, allowing extra properties if exact is `false`
 */
export function is<const T extends Descriptor>(value: unknown, type: T, exact = true): value is Type<T> {
  switch (typeof type) {
    case "string":
      switch (type) {
        case "string":
          return isString(value)

        case "number":
          return isNumber(value)

        case "bigint":
          return isBigInt(value)

        case "boolean":
          return isBoolean(value)

        case "symbol":
          return isSymbol(value)

        case "object":
          return isObject(value)

        case "function":
          return isFunction(value)

        case "record":
          return isRecord(value)

        case "array":
          return isArray(value)

        case "any":
          return isAny(value)

        case "null":
          return isNull(value)

        case "undefined":
          return isUndefined(value)
      }

    // eslint-disable-next-line no-fallthrough
    case "number":
    case "bigint":
    case "boolean":
    case "symbol":
      return isEqual(value, type)

    case "function":
      if (isClass(type)) {
        return isInstance(value, type)
      }

      return type(value)

    case "object":
      if (isNull(type)) {
        return isNull(value)
      }

      if (isLiteral(type)) {
        return isEqual(value, type[$value])
      }

      if (isRecord(type)) {
        return isRecord(value) && isMatch(value, type, exact)
      }

      if (isArray(type)) {
        return isArray(value) && isMatch(value, type, true)
      }

    // eslint-disable-next-line no-fallthrough
    default:
      assert(false, `Invalid type: ${String(type)}`)
  }
}
