import type { Type } from "../../../src"
import { inspect } from "util"
import { is, number, string } from "../../../src"

const PointSchema = [number, number] as const

type Point = Type<typeof PointSchema>

const UserSchema = { name: string, age: number }

type User = Type<typeof UserSchema>

function checkSchemas(value: unknown): void {
  if (is(value, PointSchema)) {
    console.log(`${inspect(value)} is Point`)
  }

  if (is(value, UserSchema)) {
    console.log(`${inspect(value)} is User`)
  }
}

[
  [1],
  [3, 5],
  [7, "11"],
  [4, 6, 8],
  { name: "Alice" },
  { name: "Bob", age: 16 },
  { name: "Charlie", age: "26" },
  { name: "Dave", age: 42, admin: true },
].forEach(checkSchemas)
