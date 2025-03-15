import { inspect } from "util"
import { array, is, union } from "tstk"

function checkArrays(value: unknown): void {
  if (is(value, array("number"))) {
    console.log(`${inspect(value)} is number[]`)
  }

  if (is(value, array("string"))) {
    console.log(`${inspect(value)} is string[]`)
  }

  if (is(value, array(Date))) {
    console.log(`${inspect(value)} is Date[]`)
  }

  if (is(value, array(union(0, 1)))) {
    console.log(`${inspect(value)} is (0 | 1)[]`)
  }

  if (is(value, array(union("foo", "bar", "baz")))) {
    console.log(`${inspect(value)} is ("foo" | "bar" | "baz")[]`)
  }

  if (is(value, array({ action: "string", payload: "any" }))) {
    console.log(`${inspect(value)} is { action: string, payload: any }[]`)
  }
}

[
  [0, 1, 2],
  [0, 0, 1, 1],
  ["hello", "world"],
  ["foo", "bar"],
  [new Date(), new Date("2023-01-01")],
  [{ action: "create", payload: { id: 1 } }, { action: "update", payload: { id: 2, name: "foo" } }],
].forEach(checkArrays)
