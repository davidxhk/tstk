import type { AnyRecord, PropertyType, Simplify, UnionToIntersection } from "."

/**
 * Cast a record descriptor T to its corresponding type
 */
export type RecordType<T extends AnyRecord> = Simplify<UnionToIntersection<{ [K in keyof T]-?: PropertyType<K, T[K]> }[keyof T]>>
