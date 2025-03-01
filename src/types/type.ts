import type { Descriptor, EmptyTuple, LiteralType, PredicateType, Primitive, PrimitiveType, RecordDescriptor, RecordType, SomeClass, SomeLiteral, SomePredicate, TupleDescriptor, TupleType } from "."

/**
 * Cast a type descriptor T into its corresponding type
 */
export type Type<T extends Descriptor> =
  T extends Primitive ? PrimitiveType<T> :
    T extends string | number | bigint | boolean | symbol | null ? T :
      T extends SomeClass ? InstanceType<T> :
        T extends SomeLiteral ? LiteralType<T> :
          T extends SomePredicate ? PredicateType<T> :
            T extends RecordDescriptor ? RecordType<T> :
              T extends TupleDescriptor | EmptyTuple ? TupleType<T> : never
