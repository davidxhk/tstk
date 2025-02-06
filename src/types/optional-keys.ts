import type { IsOptional } from "./is-optional"

/**
 * Extract from T all optional keys
 *
 * ```
 * type Example = OptionalKeys<{ a: 1, b?: 2 }>
 * // => "b"
 * ```
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: IsOptional<T, K> extends true ? K : never
}[keyof T]
