import type { AnyRecord } from "./any-record"
import type { PropertyType } from "./property-type"
import type { Simplify } from "./simplify"
import type { UnionToIntersection } from "./union-to-intersection"

/**
 * Cast a record descriptor T to its corresponding type
 */
export type RecordType<T extends AnyRecord> = Simplify<UnionToIntersection<{ [K in keyof T]-?: PropertyType<K, T[K]> }[keyof T]>>
