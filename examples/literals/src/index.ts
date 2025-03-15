import { inspect } from "util"
import { is, literal } from "tstk"

const $a = Symbol("a")
const $b = Symbol.for("b")

function checkLiterals(value: unknown): void {
  if (is(value, "")) {
    console.log(`${inspect(value)} is ''`)
  }

  if (is(value, "foo")) {
    console.log(`${inspect(value)} is 'foo'`)
  }

  if (is(value, 0)) {
    console.log(`${inspect(value)} is 0`)
  }

  if (is(value, 42)) {
    console.log(`${inspect(value)} is 42`)
  }

  if (is(value, 0n)) {
    console.log(`${inspect(value)} is 0n`)
  }

  if (is(value, 983498124981598n)) {
    console.log(`${inspect(value)} is 983498124981598n`)
  }

  if (is(value, true)) {
    console.log(`${inspect(value)} is true`)
  }

  if (is(value, false)) {
    console.log(`${inspect(value)} is false`)
  }

  if (is(value, $a)) {
    console.log(`${inspect(value)} is ${String($a)}`)
  }

  if (is(value, $b)) {
    console.log(`${inspect(value)} is ${String($b)}`)
  }

  if (is(value, null)) {
    console.log(`${inspect(value)} is null`)
  }

  if (is(value, literal("string"))) {
    console.log(`${inspect(value)} is 'string'`)
  }

  if (is(value, literal("number"))) {
    console.log(`${inspect(value)} is 'number'`)
  }
}

[
  "",
  "foo",
  0,
  42,
  0n,
  983498124981598n,
  true,
  false,
  $a,
  Symbol.for("b"),
  null,
  "string",
  "number",
].forEach(checkLiterals)
