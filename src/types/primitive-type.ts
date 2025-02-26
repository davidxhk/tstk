import type { Primitive, SomeArray, SomeFunction, SomeRecord } from "."

/**
 * Cast a primitive descriptor T to its corresponding type
 */
export type PrimitiveType<T extends Primitive> =
  T extends "string" ? string :
    T extends "number" ? number :
      T extends "bigint" ? bigint :
        T extends "boolean" ? boolean :
          T extends "symbol" ? symbol :
            T extends "object" ? object :
              T extends "function" ? SomeFunction :
                T extends "record" ? SomeRecord :
                  T extends "array" ? SomeArray :
                    T extends "any" ? any :
                      T extends "null" ? null :
                        T extends "undefined" ? undefined : never
