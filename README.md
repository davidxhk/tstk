# tstk
> TypeScript Toolkit. Type safety made simple.

![npm version](https://img.shields.io/npm/v/tstk)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/tstk)
![npm license](https://img.shields.io/npm/l/tstk)

**tstk** is a simple, minimal, and declarative runtime type-checking toolkit for TypeScript. Just like its name suggests, it provides small but powerful utilities that give you more control over schema validation while handling all the type safety for you.

## Why use tstk?

1. **Lightweight & Intuitive** – No complex builders or class-based schemas, just clear, composable functions like `is`, `array`, `record`, and `union`.

2. **Declarative & Flexible** – Define validation in a way that mirrors TypeScript’s type system, making it easy to express even complex schemas.

3. **Full Type Safety** – Every validation function is designed to work seamlessly with TypeScript, ensuring inferred types stay accurate and predictable.

4. **Minimal, Yet Powerful** – A small API surface that gives you precise control over how you validate data, without unnecessary overhead.

If you need a lightweight, TypeScript-first approach to runtime validation, **tstk** is built just for that.

## Install

```sh
npm install tstk
```

```sh
yarn add tstk
```

```sh
pnpm add tstk
```

## Quick Example

```ts
import { array, is, union } from "tstk"

const data = JSON.parse("['hello', 42, 'world']")

if (is(data, array(union("string", "number")))) {
  // ✅ data is ("string" | "number")[]
}
```

## Detailed Usage

Below is a more comprehensive reference showing how to check for primitives, classes, unions, arrays, records, tuples, and even complex schemas.

- Primitive type: **"string"**
  ```ts
  is("hello", "string") // => true <=> value is string
  ```
- Primitive type: **"number"**
  ```ts
  is(42, "number") // => true <=> value is number
  ```
- Primitive type: **"bigint"**
  ```ts
  is(1n, "bigint") // => true <=> value is bigint
  ```
- Primitive type: **"boolean"**
  ```ts
  is(true, "boolean") // => true <=> value is boolean
  ```
- Primitive type: **"symbol"**
  ```ts
  is(Symbol("a"), "symbol") // => true <=> value is symbol
  ```
- Primitive type: **"object"**
  ```ts
  is({}, "object") // => true <=> value is object
  is([], "object") // => true
  is(() => {}, "object") // => true
  is(null, false) // => false
  ```
> [!NOTE]
> The difference between `is(value, "object")` and `typeof value === "object"` is that the former includes **functions** (for which `typeof` returns "function") and excludes **null** (an infamous bug in JavaScript).
- Primitive type: **"record"**
  ```ts
  is({}, "record") // => true <=> value is SomeRecord
  is([], "record") // => false
  is(() => {}, "record") // => false
  is(null, false) // => false
  ```
> [!TIP]
> Use the "record" primitive if you want a plain object only.
- Primitive type: **"array"**
  ```ts
  is([], "array") // => true <=> value is SomeArray
  ```
- Primitive type: **"function"**
  ```ts
  is(() => {}, "function") // => true <=> value is SomeFunction
  ```
- Primitive type: **"any"**
  ```ts
  is(0, "any") // => true <=> value is any
  ```
- Primitive type: **"null"**
  ```ts
  is(null, "null") // => true <=> value is null
  ```
- Primitive type: **"undefined"**
  ```ts
  is(undefined, "undefined") // => true <=> value is undefined
  ```
- Literal type: `literal` wrapper
  ```ts
  is("string", literal("string")) // => true <=> value is "string"
  is("hello", literal("string")) // => false
  ```
- Literal type: **string** value
  ```ts
  is("hello", "hello") // => true <=> value is "hello"
  is("bye", "hello") // => false
  ```
> [!TIP]
> To check if a value is literally one of the primitive types like "string" or "number", use the `literal` wrapper.
- Literal type: **number** value
  ```ts
  is(1, 1) // => true <=> value is 1
  is(2, 1) // => false
  ```
- Literal type: **bigint** value
  ```ts
  is(1n, 1n) // => true <=> value is 1n
  is(2n, 1n) // => false
  ```
- Literal type: **boolean** value
  ```ts
  is(true, true) // => true <=> value is true
  is(false, true) // => false
  ```
- Literal type: **symbol** value
  ```ts
  const sym = Symbol("a")
  is(sym, sym) // => true <=> value is unique symbol
  is(Symbol("a"), sym) // => false
  ```
- Literal type: **null** value
  ```ts
  is(null, null) // => true <=> value is null
  is(0, null) // => false
  ```
- **Class** type
  ```ts
  is(new Date(), Date) // => true <=> value is Date
  is(/regex/, RegExp) // => true <=> value is RegExp
  ```
- **Union** type
  ```ts
  is("test", union("string", "number")) // => true <=> value is string | number
  is(123, union("number", "null")) // => true <=> value is number | null
  ```
- **Joint** type
  ```ts
  is({ a: 1, b: 2 }, joint({ a: 1 }, { b: 2 })) // => true <=> value is { a: 1, b: 2 }
  ```
- **Array** type
  ```ts
  is(["a", "b", "c"], array("string")) // => true <=> value is string[]
  is(["a", 1, "c"], array("string")) // => false
  ```
- **Tuple** type
  ```ts
  is(["foo", 10, true], ["string", "number", "boolean"]) // => true <=> value is [string, number, boolean]
  is(["foo", 10], ["string", "number", "boolean"]) // => false
  ```
- Record type: **collective** keys
  ```ts
  is({ a: 1 }, record("string", "number")) // => true <=> value is Record<string, number>
  is({ 0: 1 }, record("string", "number")) // => false
  ```
- Record type: **concrete** keys
  ```ts
  is({ a: 1 }, record(["a"], "number")) // => true <=> value is Record<"a", number>
  is({ b: 1 }, record(["a"], "number")) // => false
  ```
- Simple schema
  ```ts
  is({ a: 1 }, { a: "number" }) // => true <=> value is { a: number }
  is({ a: "1" }, { a: "number" }) // => false
  ```
- Complex schema
  <details>
  <summary>Show example</summary>

  ```ts
  const user = {
    userid: primitive("string"),
    name: primitive("string"),
    age: primitive("number"),
    email: primitive("string"),
    deleted: primitive("boolean"),
  }

  const address = record(["street", "city", "zipcode", "country"], "string")

  const settings = {
    theme: union("light", "dark"),
    notifications: partial(record(["email", "sms"], "boolean")),
  }

  const role = union("admin", "editor", "viewer")

  const post = {
    id: primitive("string"),
    title: primitive("string"),
    body: primitive("string"),
    attachment: optional("string"),
    publishedAt: primitive("number"),
    tags: array("string"),
  }

  const friend = joint(
    pick(user, ["userid", "name"]),
    { startedAt: primitive("number") },
  )

  const profile = {
    user,
    address,
    settings,
    roles: array(role),
    posts: array(post),
    friends: array(friend),
  }

  const data = JSON.parse(`{
    "user": {
      "userid": "12345",
      "name": "John Doe",
      "age": 30,
      "email": "johndoe@example.com",
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

  is(data, profileSchema)
  /**
   * => true <=> value is {
   *   user: {
   *     userid: string
   *     email: string
   *     name: string
   *     age: number
   *     deleted: boolean
   *   }
   *   address: {
   *     street: string;
   *     city: string;
   *     zipcode: string;
   *     country: string;
   *   }
   *   roles: ("admin" | "editor" | "viewer")[]
   *   settings: {
   *     theme: "light" | "dark"
   *     notifications: {
   *       email?: boolean | undefined
   *       sms?: boolean | undefined
   *     }
   *   }
   *   posts: {
   *     id: string
   *     title: string
   *     body: string
   *     attachment?: string | undefined
   *     publishedAt: number
   *     tags: string[]
   *   }[]
   *   friends: {
   *     userid: string
   *     name: string
   *     startedAt: number
   *   }[]
   * }
   */
  ```
  </details>

## Examples & Use Cases

### 1. Validating Form Inputs

**Before**\
Manual type checking is verbose, imperative, and has limited type safety.

```ts
if (
  typeof formData.username === "string"
  && typeof formData.age === "string"
  && ["admin", "editor", "viewer"].includes(formData.role)
) {
  // data is valid
}
```

**After**\
With **tstk**, type checking is as readable as the intended type and has full type safety.

```ts
import { is, union } from "tstk"

if (is(formData, {
  username: "string",
  age: "string",
  role: union("admin", "editor", "viewer")
})) {
  // data is valid
}
```

### 2. Validating API Responses

```ts
import { array, is } from "tstk"

fetch("/api/users")
  .then(res => res.json())
  .then((data) => {
    if (is(data, array({ id: "string", name: "string" }))) {
      // handle data
    }
  })
```

### 3. State Management Checks

```ts
import { is } from "tstk"

// Suppose this is a reducer action payload
const payload = {
  id: "todo-123",
  text: "Buy groceries",
  completed: false,
}

if (is(payload, { id: "string", text: "string", completed: "boolean" })) {
  // handle action
}
```

## API

### Core Validation

[`is(value, type)`](src/is.ts)\
Check if `value` matches the given `type`.

[`has(value, prop, type?)`](src/has.ts)\
Check if an object has a property `prop` that matches an optional `type`.

[`assert(condition, message)`](src/assert.ts)\
Throw an error with `message` if `condition` is false.

### Type Descriptors

[`primitive(type)`](src/primitive.ts)\
Define a primitive type (`"string"`, `"number"`, etc.).\
Use `primitive` to define a primitive property in a type-safe manner.

[`literal(type)`](src/literal.ts)\
Define a literal type (e.g., `literal("hello")` or `literal(42)`).\
Use `literal` to match a primitive type literally or to define a literal property in a type-safe manner.

[`union(...types)`](src/union.ts)\
Define a union type that matches *one of* the given `types`.

[`joint(...types)`](src/joint.ts)\
Define a joint type that matches *all of* the given `types`.

[`array(type)`](src/array.ts)\
Define an array type where every element matches `type`.

[`tuple(...types)`](src/tuple.ts)\
Define a tuple type that matches an array where every element matches the corresponding type in `types`.\
The array must have **exactly** the same length as `types`.

[`record(props, type)`](src/record.ts)\
Define a record type that matches a plain object with the given `props`, where all values match `type`.\
A *collective* record (e.g., `record("string", "number")`) checks that every prop matches `props`.\
A *concrete* record (e.g., `record(["a", "b"], "number")`) checks that all props **exactly** match the given `props`.

[`partial(record)`](src/partial.ts)\
Convert all properties of the given `record` type to optional.

[`optional(type)`](src/optional.ts)\
Define an optional property that matches the given `type`.

[`readonly(type)`](src/readonly.ts)\
Define a readonly property that matches the given `type`.

### Utility Functions

[`json(value)`](src/json.ts)\
Check if `value` is a JSON value (i.e., string, number, boolean, null, array, or object).

[`propertyKey(value)`](src/utils/propertyKey.ts)\
Check if `value` is a property key (i.e., string, number, or symbol).

[`filter(array, type)`](src/filter.ts)\
Return a new array including only elements that match `type`.

[`reject(array, type)`](src/reject.ts)\
Return a new array excluding elements that match `type`.

[`pick(object, props)`](src/pick.ts)\
Return a new object including only the given `props` from the original.

[`omit(object, props)`](src/omit.ts)\
Return a new object excluding the given `props` from the original.

[`remap(object, mapping)`](src/remap.ts)\
Return a new object whose keys are remapped using the provided `mapping`.

[`merge(target, ...sources)`](src/merge.ts)\
Copy properties from each source into target, with last taking precedence.

## Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository.
2. Create your feature branch:
   ```sh
   git checkout -b my-new-feature
   ```
3. Commit your changes:
   ```sh
   git commit -am 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin my-new-feature
   ```
5. Submit a **Pull Request**.

Please submit your feedback, suggestions, and bug reports via the [issues page](https://github.com/davidxhk/tstk/issues).

## License

[MIT](https://github.com/davidxhk/tstk/blob/master/license) © [David Xie](https://github.com/davidxhk)

## Acknowledgments

Inspired by the incredible work on [type‑fest](https://github.com/sindresorhus/type-fest) and the broader TypeScript community.

If `tstk` helps you, star the repo or share it with your team!

Happy type checking!

*This project is maintained with ❤️ by the open source community.*
