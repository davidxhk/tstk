import type { Void } from "."

/**
 * Construct from T a type where properties in R are required, properties in O are optional, and the rest are undefined
 *
 * ```
 * type Example = ModifyProps<{ a?: 1, b?: 2, c?: 3 }, "a", "b">
 * // => { a: 1, b?: 2, c?: undefined }
 * ```
 */
export type Modify<
  T,
  R extends keyof T,
  O extends keyof T = Exclude<keyof T, R>,
> =
  Required<Pick<T, R>> &
  Partial<Pick<T, O>> &
  Void<Omit<T, R | O>>
