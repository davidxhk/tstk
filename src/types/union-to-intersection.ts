/**
 * Construct from U an intersection of union types
 *
 * ```
 * type Example = UnionToIntersection<{ a: 1 } | { b?: 2 } | { readonly c: 3 }>
 * // => { a: 1, b?: 2, readonly c: 3 }
 * ```
 */
export type UnionToIntersection<U> = (
  U extends never ? never : (_: U) => void
) extends ((_: infer I) => void) ? I : never
