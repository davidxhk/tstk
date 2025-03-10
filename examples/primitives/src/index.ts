import { inspect } from "util"
import { is } from "tstk"

class MyClass {}

function checkPrimitives(value: unknown): void {
  if (is(value, "string")) {
    console.log(`${inspect(value)} is string`)
  }

  if (is(value, "number")) {
    console.log(`${inspect(value)} is number`)
  }

  if (is(value, "bigint")) {
    console.log(`${inspect(value)} is bigint`)
  }

  if (is(value, "boolean")) {
    console.log(`${inspect(value)} is boolean`)
  }

  if (is(value, "symbol")) {
    console.log(`${inspect(value)} is symbol`)
  }

  if (is(value, "object")) {
    console.log(`${inspect(value)} is object`)
  }

  if (is(value, "record")) {
    console.log(`${inspect(value)} is Record<keyof any, unknown>`)
  }

  if (is(value, "array")) {
    console.log(`${inspect(value)} is readonly unknown[]`)
  }

  if (is(value, "function")) {
    console.log(`${inspect(value)} is (...args: unknown[]) => unknown`)
  }

  if (is(value, "any")) {
    console.log(`${inspect(value)} is any`)
  }

  if (is(value, "null")) {
    console.log(`${inspect(value)} is null`)
  }

  if (is(value, "undefined")) {
    console.log(`${inspect(value)} is undefined`)
  }
}

[
  "",
  "foo",
  0,
  42,
  Infinity,
  Number.NaN,
  0n,
  983498124981598n,
  true,
  false,
  Symbol("a"),
  Symbol.for("b"),
  MyClass,
  (value: unknown): value is string => typeof value === "string",
  () => {},
  async () => {},
  {},
  { a: 1 },
  Object.create(null),
  [],
  [1, 2, 3],
  new MyClass(),
  /regexp/,
  new Date(),
  null,
  undefined,
].forEach(checkPrimitives)
