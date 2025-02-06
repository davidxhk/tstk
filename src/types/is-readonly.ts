import type { IsEqual } from "./is-equal"

/**
 * Return `true` if K is a readonly key of T, and `false` otherwise
 *
 * ```
 * type Example = IsReadonly<{ a: 1, b?: 2, readonly c: 3 }, "c">
 * // => true
 * type Example2 = IsReadonly<{ a: 1, b?: 2, readonly c: 3 }, "a">
 * // => false
 * ```
 */
export type IsReadonly<T, K extends keyof T> = IsEqual<Pick<T, K>, Readonly<Pick<T, K>>>
