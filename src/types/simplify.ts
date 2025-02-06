/**
 * Simplify a type by distributing its properties
 */
export type Simplify<T> = { [K in keyof T]: T[K] } & {}
