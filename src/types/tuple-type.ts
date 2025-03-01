import type { Descriptor, EmptyTuple, IsEmpty, TupleDescriptor, Type } from "."

/**
 * Cast a tuple descriptor T to its corresponding type
 */
export type TupleType<T extends TupleDescriptor | EmptyTuple> =
  IsEmpty<T> extends true
    ? EmptyTuple
    : T extends readonly [infer R]
      ? R extends Descriptor ? [Type<R>] : EmptyTuple
      : T extends readonly [...infer T, infer R]
        ? T extends TupleDescriptor ? R extends Descriptor ? [...TupleType<T>, Type<R>] : TupleType<T> : never
        : never
