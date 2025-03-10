import { inspect } from "util"
import { is } from "tstk"

class MyClass {}

function checkClasses(value: unknown): void {
  if (is(value, MyClass)) {
    console.log(`${inspect(value)} is MyClass`)
  }

  if (is(value, Date)) {
    console.log(`${inspect(value)} is Date`)
  }

  if (is(value, RegExp)) {
    console.log(`${inspect(value)} is RegExp`)
  }

  if (is(value, Map)) {
    console.log(`${inspect(value)} is Map`)
  }

  if (is(value, Set)) {
    console.log(`${inspect(value)} is Set`)
  }

  if (is(value, Promise)) {
    console.log(`${inspect(value)} is Promise`)
  }
}

[
  new MyClass(),
  new Date(),
  /regexp/,
  new Map(),
  new Set(),
  Promise.resolve(),
].forEach(checkClasses)
