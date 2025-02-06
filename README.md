# tstk

> TypeScript Toolkit. Type safety made simple.

Inspired by the simplicity and utility of [type‑fest](https://github.com/sindresorhus/type-fest), **tstk** offers a simple API to conduct type checking with.

## Install

Install **tstk** via [npm](https://npmjs.com):

```sh
npm install tstk
```

## Usage

The heart of **tstk** is the `is` function. It allows you to validate values against an extensive range of type descriptors, including primitives, literal values, classes, predicates, arrays, records, tuples, and even complex schemas.

```ts
// Primitive types
is("hello", "string") // => true (value is string)
is(42, "number") // => true (value is number)
is(1n, "bigint") // => true (value is bigint)
is(true, "boolean") // => true (value is boolean)
is(Symbol("a"), "symbol") // => true (value is symbol)
is({}, "object") // => true (value is object)
is([], "object") // => true
is(() => {}, "object") // => true
is({}, "record") // => true (value is SomeRecord)
is([], "record") // => false
is(() => {}, "record") // => false
is([], "array") // => true (value is SomeArray)
is(() => {}, "function") // => true (value is SomeFunction)
is(0, "any") // => true (value is any)
is(null, "null") // => true (value is null)
is(undefined, "undefined") // => true (value is undefined)

// Literal types
is("hello", "hello") // => true (value is "hello")
is(42, "hello") // => false
is("string", literal("string")) // => true (value is "string")
is("hello", literal("string")) // => false

// Class instance
is(new Date(), Date) // => true (value is Date)
is(/regex/, RegExp) // => true (value is RegExp)

// Type predicate
is("test", union("string", "number")) // => true (value is string | number)
is(123, union("number", "null")) // => true (value is number | null)

// Array type
is(["a", "b", "c"], array("string")) // => true (value is string[])
is(["a", 1, "c"], array("string")) // => false

// Record type
is({ a: 1 }, record("string", "number")) // => true (value is Record<string, number>)
is({ 0: 1 }, record("string", "number")) // => false
is({ a: 1 }, record(["a"], "number")) // => true (value is Record<"a", number>)
is({ b: 1 }, record(["a"], "number")) // => false

// Tuple type
is(["foo", 10, true], ["string", "number", "boolean"]) // => true (value is [string, number, boolean])
is(["foo", 10], ["string", "number", "boolean"]) // => false

// Schema type
is({ a: 1 }, { a: "number" }) // => true (value is { a: number })
is({ a: "1" }, { a: "number" }) // => false

// Complex schema
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

is(data, profileSchema) // => true (value is {
//   id: string
//   name: string
//   email: string
//   age?: number | undefined
//   isActive: boolean
//   roles: ("admin" | "editor" | "viewer")[]
//   address: Record<"street" | "city" | "zipcode" | "country", string>
//   preferences: {
//     theme: "light" | "dark"
//     notifications: {
//       email: boolean
//       sms?: boolean | undefined
//     }
//   }
//   posts: {
//     id: string
//     title: string
//     content: string
//     publishedAt?: Date | undefined
//     tags: string[]
//   }[]
//   friends: Record<"id" | "name", string>[]
// })
```

## API

### Basic

- [`is(value, type)`](src/is.ts)
  Check if a value matches the given type descriptor. Supports primitives, records, tuples, literal values, predicates, and even classes.

- [`has(value, prop, type?)`](src/has.ts)
  Determine if an object has a property that matches the given type descriptor.

- [`assert(condition, message)`](src/assert.ts)
  Assert that a condition is met, throwing an error with a custom message otherwise.

### Type Descriptors

- [`primitive(type)`](src/primitive.ts)
  Define a primitive type descriptor in a type-safe manner.

- [`record(props, type)`](src/record.ts)
  Each property of a record must match the given type of key and value.

- [`optional(type?)`](src/optional.ts)
  Define an optional property.

- [`readonly(type?)`](src/readonly.ts)
  Define a readonly property.

- [`partial(record)`](src/partial.ts)
  Convert all properties of the record type to optional.

- [`tuple(...types)`](src/tuple.ts)
  Define a tuple type in a type-safe manner.

- [`array(type)`](src/array.ts)
  Each element of an array must match the given type.

- [`literal(value)`](src/literal.ts)
  Define a literal value in a type-safe manner.

- [`union(...types)`](src/union.ts)
  The value must match one of the given types.

- [`json(value)`](src/json.ts)
  The value must be a valid JSON type.

### Utility Functions

- [`filter(value, type)`](src/filter.ts)
  Filter an array by retaining only the elements that match the specified type.

- [`reject(value, type)`](src/reject.ts)
  Filter an array by removing elements that match the specified type.

- [`pick(object, props)`](src/pick.ts)
  Extract a subset of properties from the given object.

- [`omit(object, props)`](src/omit.ts)
  Exclude a subset of properties from the given object.

- [`merge(target, ...sources)`](src/merge.ts)
  Merge multiple sources into a target, where later sources override earlier ones.

- [`remap(object, mapping)`](src/remap.ts)
  Remap the keys of an object based on the provided mapping.

## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check [issues page](https://github.com/davidxhk/tstk/issues) if you want to contribute.

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## License

[MIT](https://github.com/davidxhk/tstk/blob/master/license) © [David Xie](https://github.com/davidxhk)

## Acknowledgments

Inspired by the incredible work on [type‑fest](https://github.com/sindresorhus/type-fest) and the broader TypeScript community.

Happy type checking!

*This project is maintained with ❤️ by the open source community.*
