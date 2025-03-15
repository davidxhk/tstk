import { inspect } from "util"
import { is, joint, merge, optional } from "tstk"

function checkIntersections(value: unknown): void {
  if (is(value, merge({ name: "string" }, { age: "number" }))) {
    console.log(`${inspect(value)} is { name: string, age: number }`)
  }

  if (is(value, merge({ id: "number" }, { email: optional("string") }))) {
    console.log(`${inspect(value)} is { id: number, email?: string | undefined }`)
  }

  if (is(value, joint({ user: { name: "string" } }, { user: { age: "number" } }))) {
    console.log(`${inspect(value)} is { user: { name: string } & { age: number } }`)
  }
}

[
  { name: "Alice" },
  { name: "Bob", age: 30 },
  { id: 1 },
  { id: 2, email: "bob@example.com" },
  { user: { name: "Charlie" } },
  { user: { name: "Dave", age: 25 } },
].forEach(checkIntersections)
