/**
 * Return `true` if L and R are isomorphically equal, and `false` otherwise
 *
 * ```
 * type Example = IsEqual<{ readonly a: 1 }, { readonly a: 1 }>
 * // => true
 * type Example2 = IsEqual<{ readonly a: 1 }, { a: 1 }>
 * // => false
 * ```
 */
export type IsEqual<L, R> =
  (<U>() => U extends L ? 0 : 1) extends
  (<U>() => U extends R ? 0 : 1)
    ? true
    : false
