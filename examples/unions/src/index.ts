import { inspect } from "util"
import { array, is, union } from "tstk"

function checkUnions(value: unknown): void {
  if (is(value, union("string", "number"))) {
    console.log(`${inspect(value)} is string | number`)
  }

  if (is(value, union("string", array("string")))) {
    console.log(`${inspect(value)} is string | string[]`)
  }

  if (is(value, union("string", "number", "symbol"))) {
    console.log(`${inspect(value)} is string | number | symbol`)
  }

  if (is(value, union("foo", "bar", "baz"))) {
    console.log(`${inspect(value)} is "foo" | "bar" | "baz"`)
  }

  if (is(value, union("number", null))) {
    console.log(`${inspect(value)} is number | null`)
  }

  if (is(value, union("boolean", "true", "false", 0, 1))) {
    console.log(`${inspect(value)} is boolean | 0 | 1 | "true" | "false"`)
  }
}

[
  "foo",
  "true",
  1,
  2,
  false,
  null,
  Symbol.for("bar"),
  ["foo", "bar"],
].forEach(checkUnions)
