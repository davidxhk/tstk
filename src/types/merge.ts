import type { Tuple } from "./tuple"

/**
 * Merge a tuple of types T into a single type, with last taking precedence
 *
 * ```
 * type Example = Merge<[{ readonly a?: 3, c?: 2 }, { b: 1, readonly c: 3 }, { a: 1, b?: 2 }]>
 * // => { a: 1, b?: 2, readonly c: 3 }
 * ```
 */
export type Merge<T extends Tuple<any>> =
  T extends readonly [infer R]
    ? R
    : T extends readonly [...infer T extends Tuple<any>, infer R]
      ? Omit<Merge<T>, keyof R> & R
      : never
