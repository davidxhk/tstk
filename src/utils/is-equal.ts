/**
 * Match value T
 */
export const isEqual = <const T>(value: unknown, type: T): value is T => value === type
