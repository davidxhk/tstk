import { inspect } from "util"
import { is } from "tstk"

function checkTuples(value: unknown): void {
  if (is(value, ["string", "number"])) {
    console.log(`${inspect(value)} is [string, number]`)
  }

  if (is(value, ["number", "number", "number"])) {
    console.log(`${inspect(value)} is [number, number, number]`)
  }

  if (is(value, ["object", "function"])) {
    console.log(`${inspect(value)} is [object, (...args: unknown[]) => unknown]`)
  }

  if (is(value, [Date, Date])) {
    console.log(`${inspect(value)} is [Date, Date]`)
  }
}

[
  ["hello", 42],
  [124, 100, 229],
  [{}, () => {}],
  [new Date(), new Date("2023-01-01")],
].forEach(checkTuples)
