import type { SomeClass } from "../types"

/**
 * Check if a value is an instance of a class
 */
export const isInstance = <T extends SomeClass>(value: unknown, type: T): value is InstanceType<T> => value instanceof type
