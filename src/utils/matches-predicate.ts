import type { PredicateType, SomePredicate } from "../types"
import { isBoolean } from "."
import { assert } from "../assert"

/**
 * Check if a value matches T
 */
export function matchesPredicate<T extends SomePredicate>(value: unknown, type: T): value is PredicateType<T> {
  const result = type(value)
  assert(isBoolean(result), "Invalid type predicate: must return a boolean")
  return result
}
