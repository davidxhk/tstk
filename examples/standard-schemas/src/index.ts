import type { Type } from "../../../src"
import { inspect } from "util"
import { z } from "zod"
import { array, is, union } from "../../../src"

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
})

type User = Type<typeof UserSchema>

function checkUser(value: unknown): void {
  if (is(value, UserSchema)) {
    console.log(`${inspect(value)} is { name: string, age: number }`)
  }

  if (is(value, array(UserSchema))) {
    console.log(`${inspect(value)} is { name: string, age: number }[]`)
  }

  if (is(value, union("string", UserSchema))) {
    console.log(`${inspect(value)} is string | { name: string, age: number }`)
  }
}

[
  12,
  "foo",
  { name: "foo" },
  { name: "bar", age: 16 },
  { name: "baz", age: "27" },
  [{ name: "qux", age: 42 }],
].forEach(checkUser)
