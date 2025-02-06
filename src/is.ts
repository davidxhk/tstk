import type { Any, Type } from "./types"
import { isArray, isClass, isExact, isFunction, isLiteral, isObject, isRecord } from "./utils"

/**
 * Check if a value is T
 */
export function is<const T extends Any>(value: unknown, type: T): value is Type<T> {
  switch (typeof type) {
    case "string":
      switch (type) {
        case "string":
          return typeof value === "string"

        case "number":
          return typeof value === "number"

        case "bigint":
          return typeof value === "bigint"

        case "boolean":
          return typeof value === "boolean"

        case "symbol":
          return typeof value === "symbol"

        case "object":
          return isObject(value)

        case "function":
          return isFunction(value)

        case "record":
          return isRecord(value)

        case "array":
          return isArray(value)

        case "any":
          return true

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
        return value instanceof type
      }

      return type(value)

    case "object":
      if (type === null) {
        return value === type
      }

      if (isLiteral(type)) {
        return value === type.value
      }

      if (isRecord(type)) {
        return isRecord(value) && isExact(value, type)
      }

      if (isArray(type)) {
        return isArray(value) && isExact(value, type)
      }

    // eslint-disable-next-line no-fallthrough
    default:
      throw new TypeError(`Invalid type: ${String(type)}`)
  }
}
