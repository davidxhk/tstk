import type { Descriptor, Type } from "./types"
import { isAny, isArray, isBigInt, isBoolean, isClass, isFunction, isInstance, isLiteral, isMatch, isNumber, isObject, isRecord, isString, isSymbol } from "./utils"

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
          return value === null

        case "undefined":
          return value === undefined
      }

    // eslint-disable-next-line no-fallthrough
    case "number":
    case "bigint":
    case "boolean":
    case "symbol":
      return value === type

    case "function":
      if (isClass(type)) {
        return isInstance(value, type)
      }

      return type(value)

    case "object":
      if (type === null) {
        return value === null
      }

      if (isLiteral(type)) {
        return value === type.value
      }

      if (isRecord(type)) {
        return isRecord(value) && isMatch(value, type, exact)
      }

      if (isArray(type)) {
        return isArray(value) && isMatch(value, type, true)
      }

    // eslint-disable-next-line no-fallthrough
    default:
      throw new TypeError(`Invalid type: ${String(type)}`)
  }
}
