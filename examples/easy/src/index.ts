import type { Type } from "tstk"
import { inspect } from "util"
import { is, number, string } from "tstk"

const UserTupleSchema = [string, number] as const
type UserTuple = Type<typeof UserTupleSchema>

const UserObjectSchema = { name: string, age: number }
type UserObject = Type<typeof UserObjectSchema>

function checkSchemas(value: unknown): void {
  if (is(value, UserTupleSchema)) {
    console.log(`${inspect(value)} is UserTuple`)
  }

  if (is(value, UserObjectSchema)) {
    console.log(`${inspect(value)} is UserObject`)
  }
}

[
  ["foo"],
  ["bar", 42],
  ["baz", "qux"],
  { name: "foo" },
  { name: "bar", age: 42 },
  { name: "baz", age: "qux" },
].forEach(checkSchemas)
