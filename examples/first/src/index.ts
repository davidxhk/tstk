import { inspect } from "util"
import { array, is, union } from "tstk"

function checkUnion(value: unknown): void {
  if (is(value, union("string", array("string")))) {
    console.log(`${inspect(value)} is string | string[]`)
  }
}

[
  "",
  "hello",
  42,
  true,
  ["hello", "world"],
  ["one", "two", "three"],
  ["foo", "bar", 3000],
].forEach(checkUnion)
