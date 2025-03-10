import type { Descriptor, Type } from "./types"
import { assert } from "."
import { $value } from "./symbols"
import { isAny, isArray, isBigInt, isBoolean, isClass, isEqual, isFunction, isInstance, isLiteral, isNull, isNumber, isObject, isRecord, isStandardSchemaV1, isString, isSymbol, isUndefined, matchesPredicate, matchesRecord, matchesStandardSchemaV1, matchesTuple } from "./utils"

/**
 * Match type T
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

      return matchesPredicate(value, type)

    case "object":
      if (isNull(type)) {
        return isNull(value)
      }

      if (isLiteral(type)) {
        return isEqual(value, type[$value])
      }

      if (isStandardSchemaV1(type)) {
        return matchesStandardSchemaV1(value, type)
      }

      if (isRecord(type)) {
        return matchesRecord(value, type, exact)
      }

      if (isArray(type)) {
        return matchesTuple(value, type, exact)
      }

    // eslint-disable-next-line no-fallthrough
    default:
      assert(false, `Invalid type: ${String(type)}`)
  }
}
