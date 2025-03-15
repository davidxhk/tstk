import type { EmptyTuple, RecordDescriptor, SomeClass, SomeLiteral, SomePredicate, StandardSchemaV1, TupleDescriptor } from "."

/**
 * A type descriptor representing any possible type except `undefined`
 */
export type Descriptor = string | number | bigint | boolean | symbol | SomeClass | SomeLiteral | SomePredicate | StandardSchemaV1 | RecordDescriptor | TupleDescriptor | EmptyTuple | null
