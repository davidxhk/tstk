import type { AnyRecord, AnyTuple, EmptyTuple, SomeClass, SomeLiteral, SomePredicate } from "."

/**
 * A type descriptor representing any possible type except `undefined`
 */
export type Any = string | number | bigint | boolean | symbol | SomeClass | SomeLiteral | SomePredicate | AnyRecord | AnyTuple | EmptyTuple | null
