import type { PropertyType, RecordDescriptor, Simplify, UnionToIntersection } from "."

/**
 * Cast a record descriptor T to its corresponding type
 */
export type RecordType<T extends RecordDescriptor> = Simplify<UnionToIntersection<{ [K in keyof T]-?: PropertyType<K, T[K]> }[keyof T]>>
