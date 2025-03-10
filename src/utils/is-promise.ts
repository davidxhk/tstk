import type { SomePromise } from "../types"
import { isInstance } from "."

/**
 * Match promises
 */
export const isPromise = (value: unknown): value is SomePromise => isInstance(value, Promise)
