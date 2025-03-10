import { inspect } from "util"
import { is, optional, readonly } from "tstk"

function checkObjects(value: unknown): void {
  if (is(value, { id: "number", name: "string" })) {
    console.log(`${inspect(value)} is { id: number, name: string }`)
  }

  if (is(value, { id: "number", name: optional("string") })) {
    console.log(`${inspect(value)} is { id: number, name?: string | undefined }`)
  }

  if (is(value, { theme: "string" })) {
    console.log(`${inspect(value)} is { theme: string }`)
  }

  if (is(value, { theme: readonly("string") })) {
    console.log(`${inspect(value)} is { readonly theme: string }`)
  }

  if (is(value, { username: "string" })) {
    console.log(`${inspect(value)} is { username: string }`)
  }

  if (is(value, { username: "string" }, false)) {
    console.log(`${inspect(value)} is { username: string } (exact=false)`)
  }
}

[
  { id: 101 },
  { id: 102, name: "Alice" },
  { theme: "light" },
  Object.freeze({ theme: "dark" }),
  { username: "bob" },
  { username: "john", email: "john@example.com" },
].forEach(checkObjects)
