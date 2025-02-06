/**
 * Construct from T a type where one of any key is required, the rest are optional, and all values are mapped to U
 *
 * ```
 * type Example = PickOneAs<{ a: 1, b?: 2 }, number>
 * // => { a: number, b?: number } | { a?: number, b: number }
 * ```
 */
export type PickOneAs<T, U> = { [K in keyof T]-?: Record<K, U> & Partial<Record<Exclude<keyof T, K>, U>> }[keyof T]
