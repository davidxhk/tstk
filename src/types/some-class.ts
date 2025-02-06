import type { Class } from "./class"

/**
 * A generic class that is assignable to any class constructor
 */
export type SomeClass = Class<unknown>
