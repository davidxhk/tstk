import type { EmptyRecord } from "."

/**
 * Return `true` if K is an optional key of T, and `false` otherwise
 *
 * ```
 * type Example = IsOptional<{ a: 1, b?: 2 }, "b">
 * // => true
 * type Example2 = IsOptional<{ a: 1, b?: 2 }, "a">
 * // => false
 * ```
 */
export type IsOptional<T, K extends keyof T> = EmptyRecord extends Pick<T, K> ? true : false
