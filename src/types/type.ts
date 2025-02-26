import type { Any, AnyRecord, AnyTuple, EmptyRecord, EmptyTuple, IsEmpty, LiteralType, PredicateType, Primitive, PrimitiveType, RecordType, SomeArray, SomeClass, SomeLiteral, SomePredicate, SomeRecord, TupleType } from "."

/**
 * Cast a type descriptor T into its corresponding type
 */
export type Type<T extends Any> =
  T extends Primitive ? PrimitiveType<T> :
    T extends string | number | bigint | boolean | symbol | null ? T :
      T extends SomeClass ? InstanceType<T> :
        T extends SomeLiteral ? LiteralType<T> :
          T extends SomePredicate ? PredicateType<T> :
            T extends SomeRecord ? IsEmpty<T> extends true ? EmptyRecord : T extends AnyRecord ? RecordType<T> : never :
              T extends SomeArray ? IsEmpty<T> extends true ? EmptyTuple : T extends AnyTuple ? TupleType<T> : never : never
