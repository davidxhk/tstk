import type { IsOptional } from "./is-optional"
import type { IsReadonly } from "./is-readonly"
import type { Literal } from "./literal"
import type { PickOneAs } from "./pick-one-as"
import type { PropertyType } from "./property-type"
import type { UnionToIntersection } from "./union-to-intersection"

/**
 * Map properties in T to keys in M
 *
 * ```
 * type Example = Remap<{ b: 1, c?: 2, readonly a: 3 }, { a: "c", b: "a", c: "b" }>
 * // => { a: 1, b?: 2, readonly c: 3 }
 * ```
 */
export type Remap<T, M extends PickOneAs<T, PropertyKey>> =
  UnionToIntersection<
    { [K in keyof T]-?:
      PropertyType<K extends keyof M ? M[K] : K, {
        type: Literal<T[K]>
        optional: IsOptional<T, K>
        readonly: IsReadonly<T, K>
      }>
    }[keyof T]
  >
