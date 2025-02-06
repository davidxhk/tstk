import type { SomeArray } from "../types"

export const isArray = (value: unknown): value is SomeArray => Array.isArray(value)
