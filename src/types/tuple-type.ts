import type { Any, AnyTuple, Type } from "."

/**
 * Cast a tuple descriptor T to its corresponding type
 */
export type TupleType<T extends AnyTuple> =
  T extends readonly [infer R]
    ? R extends Any ? [Type<R>] : []
    : T extends readonly [...infer T, infer R]
      ? T extends AnyTuple ? R extends Any ? [...TupleType<T>, Type<R>] : TupleType<T> : never
      : never
