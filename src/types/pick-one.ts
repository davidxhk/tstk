/**
 * Construct from T a type where one of any key is required and the rest are optional
 *
 * ```
 * type Example = PickOne<{ a: 1, b?: 2 }>
 * // => { a: 1, b?: 2 } | { a?: 1, b: 2 }
 * ```
 */
export type PickOne<T> = { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>> }[keyof T]
