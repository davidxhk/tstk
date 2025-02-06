import type { Any } from "./any"
import type { AnyRecord } from "./any-record"
import type { AnyTuple } from "./any-tuple"
import type { EmptyRecord } from "./empty-record"
import type { EmptyTuple } from "./empty-tuple"
import type { IsEmpty } from "./is-empty"
import type { LiteralType } from "./literal-type"
import type { PredicateType } from "./predicate-type"
import type { Primitive } from "./primitive"
import type { PrimitiveType } from "./primitive-type"
import type { RecordType } from "./record-type"
import type { SomeArray } from "./some-array"
import type { SomeClass } from "./some-class"
import type { SomeLiteral } from "./some-literal"
import type { SomePredicate } from "./some-predicate"
import type { SomeRecord } from "./some-record"
import type { TupleType } from "./tuple-type"

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
