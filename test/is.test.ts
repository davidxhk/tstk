import type { Any } from "../src/types"
import { describe, expect, it } from "vitest"
import { array } from "../src/array"
import { is } from "../src/is"
import { literal } from "../src/literal"
import { optional } from "../src/optional"
import { primitive } from "../src/primitive"
import { record } from "../src/record"
import { tuple } from "../src/tuple"
import { union } from "../src/union"
import * as values from "./values"

describe("the is function", () => {
  function expectIsTrue(type: Any, ...expected: any[]) {
    for (const value of values.all) {
      expect(is(value, type)).toBe(expected.includes(value))
    }
  }

  it("can check for a string", () => expectIsTrue("string", ...values.strings))

  it("can check for a number", () => expectIsTrue("number", ...values.numbers))

  it("can check for a bigint", () => expectIsTrue("bigint", ...values.bigints))

  it("can check for a boolean", () => expectIsTrue("boolean", ...values.booleans))

  it("can check for a symbol", () => expectIsTrue("symbol", ...values.symbols))

  it("can check for an object", () => expectIsTrue("object", ...values.objects))

  it("can check for a function", () => expectIsTrue("function", ...values.functions))

  it("can check for a record", () => expectIsTrue("record", ...values.records))

  it("can check for an array", () => expectIsTrue("array", ...values.arrays))

  it("can check for any type", () => expectIsTrue("any", ...values.all))

  it("can check for null", () => expectIsTrue("null", null))

  it("can check for undefined", () => expectIsTrue("undefined", undefined))

  it("can check for a specific string", () => values.strings.forEach(string => expectIsTrue(string, string)))

  it("can check for a specific number", () => values.numbers.slice(0, -1).forEach(number => expectIsTrue(number, number)))

  it("can check for a specific bigint", () => values.bigints.forEach(bigint => expectIsTrue(bigint, bigint)))

  it("can check for a specific boolean", () => values.booleans.forEach(boolean => expectIsTrue(boolean, boolean)))

  it("can check for a specific symbol", () => values.symbols.forEach(symbol => expectIsTrue(symbol, symbol)))

  it("can check for a literal value", () => values.literals.forEach(literal => expectIsTrue(literal, literal.value)))

  it("can check for an instance of a class", () => {
    expectIsTrue(values.Class, values.instance)
    expectIsTrue(Date, values.date)
    expectIsTrue(RegExp, values.regexp)
  })

  it("can check with a type predicate", () => expectIsTrue(values.predicate, ...values.strings))

  it("can check for a tuple type", () => {
    expect(is(["foo", 10, true], ["string", "number", "boolean"])).toBe(true)
    expect(is(["foo", 10, "true"], ["string", "number", "boolean"])).toBe(false)
    expect(is(["foo", 10], ["string", "number", "boolean"])).toBe(false)
    expect(is(["foo", 10, true, "extra"], ["string", "number", "boolean"])).toBe(false)
  })

  it("can check for a union of a record and an array", () => {
    const schema = union(
      record("string", "number"),
      array("number"),
    )

    expect(is({ a: 1, b: 2 }, schema)).toBe(true)
    expect(is([1, 2, 3], schema)).toBe(true)
    expect(is({ a: "1" }, schema)).toBe(false)
    expect(is(["1", 2], schema)).toBe(false)
  })

  it("can check for a tuple containing a union and a record", () => {
    const schema = tuple(
      union("string", "number"),
      record("string", union("boolean", "number")),
    )

    expect(is(["test", { active: true, count: 5 }], schema)).toBe(true)
    expect(is([42, { active: false }], schema)).toBe(true)
    expect(is(["test", { active: "yes" }], schema)).toBe(false)
  })

  it("can check for a record with literal, union, and array values", () => {
    const schema = {
      key: literal("fixed"),
      options: array(union("on", "off")),
      fallback: union("boolean", "null"),
    }

    expect(is({
      key: "fixed",
      options: ["on", "on", "off", "off", "on"],
      fallback: null,
    }, schema)).toBe(true)

    expect(is({
      key: "fixed",
      options: ["on", "on", "on"],
      fallback: true,
    }, schema)).toBe(true)

    expect(is({
      key: "fixed",
      options: ["on", "off", "on"],
      fallback: "maybe",
    }, schema)).toBe(false)
  })

  it("can check for complex schema", () => {
    // Check for complex schema
    const profileSchema = {
      id: primitive("string"),
      name: primitive("string"),
      email: primitive("string"),
      age: optional("number"),
      isActive: primitive("boolean"),
      roles: array(union("admin", "editor", "viewer")),
      address: record(["street", "city", "zipcode", "country"], "string"),
      preferences: {
        theme: union("light", "dark"),
        notifications: {
          email: primitive("boolean"),
          sms: optional("boolean"),
        },
      },
      posts: array({
        id: "string",
        title: "string",
        content: "string",
        publishedAt: optional(Date),
        tags: array("string"),
      }),
      friends: array(record(["id", "name"], "string")),
    }

    const data = {
      id: "user-123",
      name: "Jane Doe",
      email: "jane@example.com",
      age: 28,
      isActive: true,
      roles: ["editor"],
      address: {
        street: "123 Maple St",
        city: "Springfield",
        zipcode: "12345",
        country: "USA",
      },
      preferences: {
        theme: "dark",
        notifications: {
          email: true,
          sms: false,
        },
      },
      posts: [
        {
          id: "post-1",
          title: "Hello World",
          content: "This is my first post!",
          publishedAt: new Date(),
          tags: ["introduction", "welcome"],
        },
      ],
      friends: [
        { id: "user-456", name: "John Smith" },
        { id: "user-789", name: "Alice Johnson" },
      ],
    }

    expect(is(data, profileSchema)).toBe(true)
  })
})
