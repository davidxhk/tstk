import type { IsReadonly } from "."

/**
 * Extract from T all readonly keys
 *
 * ```
 * type Example = ReadonlyKeys<{ a: 1, b?: 2, readonly c: 3 }>
 * // => "c"
 * ```
 */
export type ReadonlyKeys<T> = {
  [K in keyof T]-?: IsReadonly<T, K> extends true ? K : never
}[keyof T]
