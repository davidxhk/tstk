import type { SomePromise } from "../types"
import { isInstance } from "."

/**
 * Check if a value is a promise
 */
export const isPromise = (value: unknown): value is SomePromise => isInstance(value, Promise)
