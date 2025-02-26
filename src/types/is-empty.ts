import type { SomeArray, SomeRecord } from "."

/**
 * Return `true` if T is an empty string, record, or array, and `false` otherwise
 *
 * ```
 * type Example = IsEmpty<"">
 * // => true
 * type Example2 = IsEmpty<"a">
 * // => false
 * type Example3 = IsEmpty<{}>
 * // => true
 * type Example4 = IsEmpty<{ a: 1 }>
 * // => false
 * type Example5 = IsEmpty<[]>
 * // => true
 * type Example6 = IsEmpty<["a"]>
 * // => false
 * ```
 */
export type IsEmpty<T extends string | SomeRecord | SomeArray> =
  T extends string ? T extends "" ? true : false :
    T extends SomeRecord ? keyof T extends never ? true : false :
      T extends SomeArray ? T["length"] extends 0 ? true : false :
        never
