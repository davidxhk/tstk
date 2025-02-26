import type { IsOptional } from "."

/**
 * Extract from T all required keys
 *
 * ```
 * type Example = RequiredKeys<{ a: 1, b?: 2 }>
 * // => "a"
 * ```
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: IsOptional<T, K> extends false ? K : never
}[keyof T]
