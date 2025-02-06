import type { SomeFunction } from "../types"

export const isFunction = (value: unknown): value is SomeFunction => typeof value === "function"
