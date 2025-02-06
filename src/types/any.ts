import type { AnyRecord } from "./any-record"
import type { AnyTuple } from "./any-tuple"
import type { EmptyTuple } from "./empty-tuple"
import type { SomeClass } from "./some-class"
import type { SomeLiteral } from "./some-literal"
import type { SomePredicate } from "./some-predicate"

/**
 * A type descriptor representing any possible type except `undefined`
 */
export type Any = string | number | bigint | boolean | symbol | SomeClass | SomeLiteral | SomePredicate | AnyRecord | AnyTuple | EmptyTuple | null
