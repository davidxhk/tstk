import type { AnyTuple } from "../types"
import { isAny } from "./is-any"
import { isArray } from "./is-array"

export const isAnyTuple = (value: unknown): value is AnyTuple => isArray(value) && Array.from(value).every(elem => isAny(elem))
