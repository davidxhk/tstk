import type { SomeArray, UnionToIntersection } from "."

/**
 * Exclude from T all elements that extend U
 *
 * ```
 * type Example = Reject<["a", 1, "b", 2], number>
 * // => ["a", "b"]
 * ```
 */
export type Reject<T extends SomeArray, U> =
  T extends readonly [infer R]
    ? R extends U ? [] : [R]
    : T extends readonly [...infer T, infer R]
      ? R extends U ? Reject<T, U> : [...Reject<T, U>, R]
      : UnionToIntersection<T> extends readonly (infer R)[] ? Exclude<R, U>[] : never
