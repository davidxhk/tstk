import type { Class } from "./class"

/**
 * A catch-all type to which any class constructor is assignable
 */
export type SomeClass = Class<unknown>
