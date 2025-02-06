import type { SomeRecord } from "../types"

export const isRecord = (value: unknown): value is SomeRecord => typeof value === "object" && value !== null && (value.constructor === Object || value.constructor === undefined)
