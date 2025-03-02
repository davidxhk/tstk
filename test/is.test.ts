import type { Descriptor } from "../src/types"
import { describe, expect, it } from "vitest"
import { array, is, joint, literal, optional, partial, pick, primitive, record, tuple, union } from "../src"
import { $value } from "../src/symbols"
import * as values from "./values"

describe("the is function", () => {
  function expectIsTrue(type: Descriptor, ...expected: any[]) {
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

  it("can check for a literal value", () => values.literals.forEach(literal => expectIsTrue(literal, literal[$value])))

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
    const schema = union(record("string", "number"), array("number"))

    expect(is({ a: 1, b: 2 }, schema)).toBe(true)
    expect(is([1, 2, 3], schema)).toBe(true)
    expect(is({ a: "1" }, schema)).toBe(false)
    expect(is(["1", 2], schema)).toBe(false)
  })

  it("can check for a tuple containing a union and a record", () => {
    const schema = tuple(union("string", "number"), record("string", union("boolean", "number")))

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
    const User = {
      userid: primitive("string"),
      email: primitive("string"),
      name: primitive("string"),
      age: primitive("number"),
      deleted: primitive("boolean"),
    }

    const Address = record(["street", "city", "zipcode", "country"], "string")

    const Settings = {
      theme: union("light", "dark"),
      notifications: partial(record(["email", "sms"], "boolean")),
    }

    const Role = union("admin", "editor", "viewer")

    const Post = {
      id: primitive("string"),
      title: primitive("string"),
      body: primitive("string"),
      attachment: optional("string"),
      publishedAt: primitive("number"),
      tags: array("string"),
    }

    const Friend = joint(
      pick(User, ["userid", "name"]),
      { startedAt: primitive("number") },
    )

    const Profile = {
      user: User,
      address: Address,
      settings: Settings,
      roles: array(Role),
      posts: array(Post),
      friends: array(Friend),
    }

    const data = JSON.parse(`{
      "user": {
        "userid": "12345",
        "email": "johndoe@example.com",
        "name": "John Doe",
        "age": 30,
        "deleted": false
      },
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "zipcode": "12345",
        "country": "USA"
      },
      "roles": ["admin", "viewer"],
      "settings": {
        "theme": "dark",
        "notifications": {
          "email": true
        }
      },
      "posts": [
        {
          "id": "post1",
          "title": "First Post",
          "body": "This is the content of the first post.",
          "attachment": "http://example.com/attachment1.jpg",
          "publishedAt": 1672531200000,
          "tags": ["tech", "news"]
        },
        {
          "id": "post2",
          "title": "Second Post",
          "body": "This is the content of the second post.",
          "publishedAt": 1672617600000,
          "tags": ["life", "personal"]
        }
      ],
      "friends": [
        {
          "userid": "67890",
          "name": "Jane Smith",
          "startedAt": 1672444800000
        },
        {
          "userid": "54321",
          "name": "Alice Johnson",
          "startedAt": 1672358400000
        }
      ]
    }`)

    expect(is(data, Profile)).toBe(true)
  })
})

it("allows extra properties if exact is false", () => {
  expect(is({ foo: 1, bar: 2 }, { foo: "number" })).toBe(false)
  expect(is({ foo: 1, bar: 2 }, { foo: "number" }, false)).toBe(true)
})
