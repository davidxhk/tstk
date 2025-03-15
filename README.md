# tstk
> Type safety made simple.

**tstk** is a simple, minimal, and declarative runtime type-checking toolkit for TypeScript.

Just like its name suggests, it provides small but powerful utilities that help you narrow types easily, while handling all the type safety for you.

## Why tstk?

### 🛡 TypeScript-style type safety at runtime

Check for a string or a string array with **1** line.

```ts
is(value, union("string", array("string"))) // value: string | string[]
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/first?file=src%2Findex.ts&view=editor)

tstk lets you write type validations that look _almost exactly like TypeScript types_ with just a few simple and composable functions, helping you validate unknown data in a **clean and maintainable** way.

### 🔁 Schemas that look exactly like TypeScript

Define schemas just like how they look in TypeScript.

```ts
const PointSchema = [number, number] as const

type Point = Type<typeof PointSchema> // [number, number]

const UserSchema = { name: string, age: number }

type User = Type<typeof UserSchema> // { name: string, age: number }
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/second?file=src%2Findex.ts&view=editor)

- **Familiar and intuitive**\
  Define schemas exactly as you would in TypeScript

- **Automatic type inference**\
  Use `Type<T>` to get TypeScript types from schemas

- **Compatible with existing tools**\
  Works with [Standard Schema V1](#standard-schemas), so you can use it alongside Zod, Valibot, ArkType, and more

### 📏 Type safety that fits in your pocket

tstk has **0** dependencies and a _featherweight_ minzipped size.

![npm version](https://img.shields.io/npm/v/tstk)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/tstk)

It's tiny enough so you can use it anywhere, without worrying about its impact on your bundle size.

> If you need **type-safe runtime validation** _without the overhead_, **tstk** is built just for you.

## Install

Use your preferred package manager to install [🧰tstk](https://www.npmjs.com/package/tstk) from the npm registry.

```sh
npm install tstk
```

```sh
yarn add tstk
```

```sh
pnpm add tstk
```

## Usage

tstk allows you to check for a wide variety of types including [primitives](#primitives), [literals](#literals), [classes](#classes), [objects](#objects), [records](#records), [tuples](#tuples), [arrays](#arrays), [unions](#unions), [intersections](#intersections), [schemas](#schemas), and even [standard schemas](#standard-schemas).

### Primitives

Primitive types are represented by their literal strings such as "string" or "number".

Notably, "object" includes **functions** and excludes **null** (unlike `typeof`).

```ts
is({}, "object") // true
is([], "object") // true
is(() => {}, "object") // true
is(null, "object") // false
```

Also, "record" matches plain objects only.

```ts
is({}, "record") // true
is([], "record") // false
is(() => {}, "record") // false
is(null, "record") // false
```

<details>
<summary>Show examples</summary>

```ts
is(value, "string") // value: string

is(value, "number") // value: number

is(value, "bigint") // value: bigint

is(value, "boolean") // value: boolean

is(value, "symbol") // value: symbol

is(value, "object") // value: object

is(value, "record") // value: Record<keyof any, unknown>

is(value, "array") // value: readonly unknown[]

is(value, "function") // value: (...args: unknown[]) => unknown

is(value, "any") // value: any

is(value, "null") // value: null

is(value, "undefined") // value: undefined
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/primitives?file=src%2Findex.ts&view=editor)

</details>

### Literals

Literal types are represented by their literal values.

Any literal `string`, `number`, `bigint`, `boolean`, `symbol`, or `null` is supported.

To match a literal primitive type like "string" or "number", use `literal(type)`.

<details>
<summary>Show examples</summary>

```ts
is(value, "") // value: ""

is(value, "foo") // value: "foo"

is(value, 0) // value: 0

is(value, 42) // value: 42

is(value, 0n) // value: 0n

is(value, 983498124981598n) // value: 983498124981598n

is(value, true) // value: true

is(value, false) // value: false

const $a = Symbol("a")
is(value, $a) // value: typeof $a

const $b = Symbol.for("b")
is(value, $b) // value: typeof $b

is(value, null) // value: null

is(value, literal("string")) // value: "string"

is(value, literal("number")) // value: "number"
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/literals?file=src%2Findex.ts&view=editor)

</details>

### Classes

Classes match their instances. Native classes like `Date` are supported too.

<details>
<summary>Show examples</summary>

```ts
class MyClass {}
is(value, MyClass) // value: MyClass

is(value, Date) // value: Date

is(value, RegExp) // value: RegExp

is(value, Map) // value: Map<unknown, unknown>

is(value, Set) // value: Set<unknown>

is(value, Promise) // value: Promise<unknown>
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/classes?file=src%2Findex.ts&view=editor)

</details>

### Objects

Objects match plain objects with the given properties and types.

`optional(type)` marks a property as optional.

```ts
is({ foo: 1 }, { foo: optional("number") }) // true
is({}, { foo: optional("number") }) // true
```

`readonly(type)` marks a property as readonly.

```ts
const value = { foo: 1 }
is(value, { foo: readonly("number") }) // false

Object.freeze(value)
is(value, { foo: readonly("number") }) // true
```

By default, properties must be exact. Pass `false` to allow non-specified properties.

```ts
is({ foo: 1, bar: 2 }, { foo: "number" }) // false
is({ foo: 1, bar: 2 }, { foo: "number" }, false) // true
```

<details>
<summary>Show examples</summary>

```ts
is(value, { id: "number", name: "string" }) // value: { id: number, name: string }

is(value, { id: "number", name: optional("string") }) // value: { id: number, name?: string | undefined }

is(value, { theme: "string" }) // value: { theme: string }

is(value, { theme: readonly("string") }) // value: { readonly theme: string }

is(value, { username: "string" }) // value: { username: string }

is(value, { username: "string" }, false) // value: { username: string } (exact=false)
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/objects?file=src%2Findex.ts&view=editor)

</details>

### Records

<details>
<summary><i>wip</i></summary>

A _collective_ record such as `record("string", "number")` checks that every prop matches `props`.

```ts
is(value, record("string", "number")) // value: Record<string, number>
```

A _concrete_ record such as `record(["foo", "bar"], "number")` checks that all `props` are present.

```ts
is(value, record(["foo", "bar"], "string")) // value: Record<"foo" | "bar", string>
```

`partial(record)` works with concrete records or schemas only.

```ts
const Foo = partial(record(["foo"], "number"))
type FooType = Type<typeof Foo> // FooType: { foo?: number | undefined }

const Bar = partial({ bar: number })
type BarType = Type<typeof Bar> // BarType: { bar?: number | undefined }
```
</details>

### Tuples

Tuples match fixed-length arrays with the given types in each position.

<details>
<summary>Show examples</summary>

```ts
is(value, ["string", "number"]) // value: [string, number]

is(value, ["number", "number", "number"]) // value: [number, number, number]

is(value, ["object", "function"]) // value: [object, (...args: unknown[]) => unknown]

is(value, [Date, Date]) // value: [Date, Date]
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/tuples?file=src%2Findex.ts&view=editor)

</details>

### Arrays

`array(type)` matches arrays of any length with the given type.

<details>
<summary>Show examples</summary>

```ts
is(value, array("number")) // value: number[]

is(value, array("string")) // value: string[]

is(value, array(Date)) // value: Date[]

is(value, array(union(0, 1))) // value: (0 | 1)[]

is(value, array(union("foo", "bar", "baz"))) // value: ("foo" | "bar" | "baz")[]

is(value, array({ action: "string", payload: "any" })) // value: { action: string, payload: any }[]
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/arrays?file=src%2Findex.ts&view=editor)

</details>

### Unions

`union(...types)` represents a type union.

<details>
<summary>Show examples</summary>

```ts
is(value, union("string", "number")) // value: string | number

is(value, union("string", array("string"))) // value: string | string[]

is(value, union("string", "number", "symbol")) // value: string | number | symbol

is(value, union("foo", "bar", "baz")) // value: "foo" | "bar" | "baz"

is(value, union("number", null)) // value: number | null

is(value, union("boolean", "true", "false", 0, 1)) // value: boolean | 0 | 1 | "true" | "false"
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/unions?file=src%2Findex.ts&view=editor)

</details>

### Intersections

`merge(...objects)` combines object types with a shallow merge.

Alternatively, `joint(...types)` defines an intersection of any type.

<details>
<summary>Show examples</summary>

```ts
is(value, merge({ name: "string" }, { age: "number" })) // value: { name: string, age: number }

is(value, merge({ id: "number" }, { email: optional("string") })) // value: { id: number, email?: string | undefined }

is(value, joint({ user: { name: "string" } }, { user: { age: "number" } })) // value: { user: { name: string } & { age: number } }
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/intersections?file=src%2Findex.ts&view=editor)

</details>

### Schemas

You can define schemas with any type.

To improve typing, use wrappers like `primitive(type)` and `literal(type)` or predicates like `string` and `number`.

```ts
import { boolean, literal, number, optional, primitive, string } from "tstk"

const UserSchema = {
  // Wrappers
  type: literal("User"),
  name: primitive("string"),
  admin: optional("boolean"),

  // Predicates
  email: string,
  age: number,
  deleted: boolean,
}
```

Use `Type<T>` to infer a schema's type.

```ts
import type { Type } from "tstk"

type User = Type<typeof UserSchema>
```

> ```ts
> type User = {
>   type: "User"
>   name: string
>   admin?: boolean | undefined
>   email: string
>   age: number
>   deleted: boolean
> }
> ```

<details>
<summary>Show examples</summary>

```ts
const UserSchema = {
  userid: string,
  name: string,
  age: number,
  email: string,
  deleted: boolean,
}

const AddressSchema = record(["street", "city", "zipcode", "country"], "string")

const SettingsSchema = {
  theme: union("light", "dark"),
  notifications: partial(record(["email", "sms"], "boolean")),
}

const RoleSchema = union("admin", "editor", "viewer")

const PostSchema = {
  id: string,
  title: string,
  body: string,
  attachment: optional("string"),
  publishedAt: number,
  tags: array("string"),
}

const FriendSchema = merge(
  pick(UserSchema, ["userid", "name"]),
  { startedAt: "number" },
)

const ProfileSchema = {
  user: UserSchema,
  address: AddressSchema,
  settings: SettingsSchema,
  roles: array(RoleSchema),
  posts: array(PostSchema),
  friends: array(FriendSchema),
}
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/schemas?file=src%2Findex.ts&view=editor)

</details>

### Standard Schemas

[Standard schemas](https://github.com/standard-schema/standard-schema) are supported too.

They can even be composed with other types like `array` or `union`.

<details>
<summary>Show examples</summary>

```ts
const UserSchema = z.object({
  name: z.string(),
  age: z.number()
})

is(value, UserSchema) // value: { name: string, age: number }

is(value, array(UserSchema)) // value: { name: string, age: number }[]

is(value, union("string", UserSchema)) // value: string | { name: string, age: number }
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/fork/github/davidxhk/tstk/tree/main/examples/standard-schemas?file=src%2Findex.ts&view=editor)

</details>

## API

### Core Functionality

[`is(value, type, exact?)`](src/is.ts)\
Check if `value` matches `type`, allowing extra properties if `exact` is false.

[`has(value, prop, type?, exact?)`](src/has.ts)\
Check if `value` has property `prop` that matches some optional `type`, allowing extra properties if `exact` is false.

[`assert(condition, message)`](src/assert.ts)\
Throw an error with `message` if `condition` is false.

### Type Descriptors

[`primitive(type)`](src/primitive.ts)\
Define a primitive type such as "string" or "number".

[`literal(type)`](src/literal.ts)\
Define a literal type such as `literal("hello")` or `literal(42)`.

[`union(...types)`](src/union.ts)\
Define a union type that matches _one of_ `types`.

[`joint(...types)`](src/joint.ts)\
Define a joint type that matches _all of_ `types`.

[`array(type)`](src/array.ts)\
Define an array type where every element matches `type`.

[`tuple(...types)`](src/tuple.ts)\
Define a tuple type matching `types` in length and types.

[`record(props, type)`](src/record.ts)\
Define a record type that matches a plain object with `props`, where all values match `type`.

[`partial(record)`](src/partial.ts)\
Convert all properties of `record` to optional.

[`optional(type)`](src/optional.ts)\
Define an optional property that matches `type`.

[`readonly(type)`](src/readonly.ts)\
Define a readonly property that matches `type`.

[`string(value)`](src/utils/is-string.ts)\
Check if `value` is a string.

[`number(value)`](src/utils/is-number.ts)\
Check if `value` is a number.

[`bigint(value)`](src/utils/is-bigint.ts)\
Check if `value` is a bigint.

[`boolean(value)`](src/utils/is-boolean.ts)\
Check if `value` is a boolean.

[`symbol(value)`](src/utils/is-symbol.ts)\
Check if `value` is a symbol.

[`object(value)`](src/utils/is-object.ts)\
Check if `value` is an object.

[`function_(value)`](src/utils/is-function.ts)\
Check if `value` is a function.

[`any(value)`](src/utils/is-any.ts)\
This is effectively a no-op.

[`json(value)`](src/utils/is-json.ts)\
Check if `value` is a JSON value.

[`propertyKey(value)`](src/utils/is-property-key.ts)\
Check if `value` is a property key.

### Utility Functions

[`get(object, prop)`](src/utils/get.ts)\
Get the value of `prop` for `object`, binding functions if applicable.

[`keys(object)`](src/utils/keys.ts)\
Get all property keys of `object`, casting to integers if applicable.

[`filter(array, type)`](src/filter.ts)\
Return a new array including only elements that match `type`.

[`reject(array, type)`](src/reject.ts)\
Return a new array excluding elements that match `type`.

[`pick(object, props)`](src/pick.ts)\
Return a new object including only `props` from the original.

[`omit(object, props)`](src/omit.ts)\
Return a new object excluding `props` from the original.

[`remap(object, mapping)`](src/remap.ts)\
Return a new object whose keys are remapped using `mapping`.

[`merge(...objects)`](src/merge.ts)\
Return a new object merged from all `objects`, with last taking precedence.

## Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository.
2. Create your feature branch:
   ```sh
   git checkout -b my-new-feature
   ```
3. Commit your changes:
   ```sh
   git commit -am 'My feature'
   ```
4. Push to the branch:
   ```sh
   git push origin my-new-feature
   ```
5. Submit a [PR](https://github.com/davidxhk/tstk/pulls).

Please submit your feedback, suggestions, and bug reports on the [issues page](https://github.com/davidxhk/tstk/issues).

## License

[MIT](https://github.com/davidxhk/tstk/blob/master/license) © [David Xie](https://github.com/davidxhk)

## Acknowledgments

Inspired by [🎆type-fest](https://github.com/sindresorhus/type-fest) and [🛠️lodash](https://github.com/lodash/lodash).

If tstk helps you, star the repo or share it with your team!

Happy type checking!

_Maintained with ❤️ from 🇸🇬._
