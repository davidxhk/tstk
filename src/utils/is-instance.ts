import type { SomeClass } from "../types"

/**
 * Match instances of T
 */
export const isInstance = <T extends SomeClass>(value: unknown, type: T): value is InstanceType<T> => value instanceof type
