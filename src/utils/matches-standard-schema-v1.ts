import type { StandardSchemaV1 } from "../types"
import { isIn, isInstance } from "."
import { assert } from "../assert"

/**
 * Match v1 standard schema T
 */
export function matchesStandardSchemaV1<T extends StandardSchemaV1>(value: unknown, type: T): value is StandardSchemaV1.InferOutput<T> {
  const result = type["~standard"].validate(value)
  assert(!isInstance(result, Promise), "Asynchronous standard schema is not supported")
  return !isIn(result, "issues")
}
