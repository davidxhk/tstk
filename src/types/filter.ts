import type { SomeArray, UnionToIntersection } from "."

/**
 * Extract from T all elements that extend U
 *
 * ```
 * type Example = Filter<["a", 1, "b", 2], string>
 * // => ["a", "b"]
 * ```
 */
export type Filter<T extends SomeArray, U> =
  T extends readonly [infer R]
    ? R extends U ? [R] : []
    : T extends readonly [...infer T, infer R]
      ? R extends U ? [...Filter<T, U>, R] : Filter<T, U>
      : UnionToIntersection<T> extends readonly (infer R)[] ? Extract<R, U>[] : never
