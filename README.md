# tstk
> Type safety made simple.

![npm version](https://img.shields.io/npm/v/tstk)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/tstk)
![npm license](https://img.shields.io/npm/l/tstk)

**tstk** is a simple, minimal, and declarative runtime type-checking toolkit for TypeScript. Just like its name suggests, it provides small but powerful utilities that help you narrow types easily while handling all the type safety for you.

## Why tstk?

**_Neat_**\
Tired of creating a schema for every single shape and size? Inline your type definitions with simple, composable functions like `is`, `array`, `record`, and `union`. Never hit _F12_ on your keyboard (Go to definition) again.

**_Easy_**\
Checking for a string or a string array? Here you go: `union("string", array("string"))`. Define your types with descriptors that mimic TypeScript as closely as possible. tstk handles the rest for you.

**_Tiny_**\
With **zero** dependencies and a featherweight minzipped size, tstk keeps your bundle small. So you can install it guilt-free and ease your bundlephobia.

If you need a **handy and lightweight** approach to runtime validation, tstk is built just for that.

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

## Quick Example

```ts
import { array, is, union } from "tstk"

const value = JSON.parse("['hello', 42, 'world']")

if (is(value, array(union("string", "number")))) {
  value
  /**
    ┌──────────────────────────────────┐
    │ const value: (string | number)[] │
    └──────────────────────────────────┘
   */
}
```

## Use Cases

### 1. Validating API Responses

For simple API responses, tstk cuts out the need to define and parse against a full schema, enabling **clean and inline validation** that's easier to maintain and integrate into your data flow.

- With zod
  ```ts
  import { z } from "zod"

  const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
  })

  fetch("/api/users")
    .then(res => res.json())
    .then((data) => {
      const result = UserSchema.safeParse(data)
      if (result.success) {
        result.data
        /**
          ┌───────────────────────────────────────────────┐
          │ (property) data: { id: number; name: string } │
          └───────────────────────────────────────────────┘
         */
      }
    })
  ```
- With tstk
  ```ts
  import { is } from "tstk"

  fetch("/api/users")
    .then(res => res.json())
    .then((data) => {
      if (is(data, { id: "number", name: "string" })) {
        data
        /**
          ┌──────────────────────────────────────────┐
          │ const data: { id: number; name: string } │
          └──────────────────────────────────────────┘
         */
      }
    })
  ```

### 2. Validating Dynamic Query Parameters

When working with runtime data like URL query parameters in a Next.js application, tstk offers a **direct and minimalistic approach** to validation without the extra overhead of creating a schema.

- With zod
  ```ts
  import { useSearchParams } from "next/navigation"
  import { z } from "zod"

  const QuerySchema = z.object({
    id: z.string(),
  })

  function MyComponent() {
    const searchParams = useSearchParams()
    const query = Object.fromEntries(searchParams.entries())

    const result = QuerySchema.safeParse(query)
    if (result.success) {
      result.data
      /**
        ┌─────────────────────────────────┐
        │ (property) data: { id: number } │
        └─────────────────────────────────┘
       */
    }
  }
  ```
- With tstk
  ```ts
  import { useSearchParams } from "next/navigation"
  import { is } from "tstk"

  function MyComponent() {
    const searchParams = useSearchParams()
    const query = Object.fromEntries(searchParams.entries())

    if (is(query, { id: "string" })) {
      query
      /**
        ┌─────────────────────────────┐
        │ const query: { id: string } │
        └─────────────────────────────┘
       */
    }
  }
  ```

### 3. Validating Local Storage Data

For data from sources like local storage where the shape isn't known until runtime, tstk provides a **concise and effective method** to achieve type safety as opposed to manual type checking.

- With `typeof`, etc.
  ```ts
  const data = localStorage.getItem("config")
  if (data) {
    const config = JSON.parse(data) as unknown
    if (
      config
      && typeof config === "object"
      && "theme" in config
      && typeof config.theme === "string"
      && ["light", "dark"].includes(config.theme)
      && "notifications" in config
      && typeof config.notifications === "boolean"
    ) {
      config
      /**
        ┌────────────────────────────────────┐
        │ const config: object               │
        │ & Record<"theme", unknown>         │
        │ & Record<"notifications", unknown> │
        └────────────────────────────────────┘
       */
    }
  }
  ```
- With tstk
  ```ts
  import { is } from "tstk"

  const data = localStorage.getItem("config")
  if (data) {
    const config = JSON.parse(data)
    if (is(config, {
      theme: union("light", "dark"),
      notifications: "boolean"
    })) {
      config
      /**
        ┌──────────────────────────────┐
        │ const config: {              │
        │     theme: "light" | "dark"; │
        │     notifications: boolean;  │
        │ }                            │
        └──────────────────────────────┘
       */
    }
  }
  ```

## Detailed Usage

Below is a more comprehensive reference showing how to check for primitives, classes, unions, arrays, records, tuples, and even complex schemas.

- Primitive type: **"string"**
  ```ts
  if (is(value, "string")) {
    value
    /**
      ┌─────────────────────┐
      │ const value: string │
      └─────────────────────┘
     */
  }
  ```
- Primitive type: **"number"**
  ```ts
  if (is(value, "number")) {
    value
    /**
      ┌─────────────────────┐
      │ const value: number │
      └─────────────────────┘
     */
  }
  ```
- Primitive type: **"bigint"**
  ```ts
  if (is(value, "bigint")) {
    value
    /**
      ┌─────────────────────┐
      │ const value: bigint │
      └─────────────────────┘
     */
  }
  ```
- Primitive type: **"boolean"**
  ```ts
  if (is(value, "boolean")) {
    value
    /**
      ┌──────────────────────┐
      │ const value: boolean │
      └──────────────────────┘
     */
  }
  ```
- Primitive type: **"symbol"**
  ```ts
  if (is(value, "symbol")) {
    value
    /**
      ┌─────────────────────┐
      │ const value: symbol │
      └─────────────────────┘
     */
  }
  ```
- Primitive type: **"object"**
  ```ts
  if (is(value, "object")) {
    value
    /**
      ┌─────────────────────┐
      │ const value: object │
      └─────────────────────┘
     */
  }
  ```
> [!NOTE]
> Unlike JavaScript's `typeof` operator, `is(value, "object")` includes **functions** (for which `typeof` returns "function") and excludes **null** (an infamous ~~bug~~ feature of `typeof`).
> ```ts
> is({}, "object") // true
> is([], "object") // true
> is(() => {}, "object") // true
> is(null, false) // false
> ```
- Primitive type: **"record"**
  ```ts
  if (is(value, "record")) {
    value
    /**
      ┌─────────────────────────────────────────┐
      │ const value: Record<keyof any, unknown> │
      └─────────────────────────────────────────┘
     */
  }
  ```
> [!TIP]
> Use the "record" primitive to match a plain object only.
> ```ts
> is({}, "record") // true
> is([], "record") // false
> is(() => {}, "record") // false
> is(null, false) // false
> ```
- Primitive type: **"array"**
  ```ts
  if (is(value, "array")) {
    value
    /**
      ┌─────────────────────────────────┐
      │ const value: readonly unknown[] │
      └─────────────────────────────────┘
     */
  }
  ```
- Primitive type: **"function"**
  ```ts
  if (is(value, "function")) {
    value
    /**
      ┌──────────────────────────────────────────────┐
      │ const value: (...args: unknown[]) => unknown │
      └──────────────────────────────────────────────┘
     */
  }
  ```
- Primitive type: **"any"**
  ```ts
  if (is(value, "any")) {
    value
    /**
      ┌──────────────────┐
      │ const value: any │
      └──────────────────┘
     */
  }
  ```
- Primitive type: **"null"**
  ```ts
  if (is(value, "null")) {
    value
    /**
      ┌───────────────────┐
      │ const value: null │
      └───────────────────┘
     */
  }
  ```
- Primitive type: **"undefined"**
  ```ts
  if (is(value, "undefined")) {
    value
    /**
      ┌────────────────────────┐
      │ const value: undefined │
      └────────────────────────┘
     */
  }
  ```
- Literal type: **string** value
  ```ts
  if (is(value, "hello")) {
    value
    /**
      ┌──────────────────────┐
      │ const value: "hello" │
      └──────────────────────┘
     */
  }
  ```
- Literal type: **number** value
  ```ts
  if (is(value, 42)) {
    value
    /**
      ┌─────────────────┐
      │ const value: 42 │
      └─────────────────┘
     */
  }
  ```
- Literal type: **bigint** value
  ```ts
  if (is(value, 21n)) {
    value
    /**
      ┌──────────────────┐
      │ const value: 21n │
      └──────────────────┘
     */
  }
  ```
- Literal type: **boolean** value
  ```ts
  if (is(value, true)) {
    value
    /**
      ┌───────────────────┐
      │ const value: true │
      └───────────────────┘
     */
  }
  ```
- Literal type: **symbol** value
  ```ts
  const $foo = Symbol("foo")
  if (is(value, symbol)) {
    value
    /**
      ┌──────────────────────────┐
      │ const value: typeof $foo │
      └──────────────────────────┘
     */
  }
  ```
- Literal type: **null** value
  ```ts
  if (is(value, null)) {
    value
    /**
      ┌───────────────────┐
      │ const value: null │
      └───────────────────┘
     */
  }
  ```
- Literal type: `literal` value
  ```ts
  if (is(value, literal("string"))) {
    value
    /**
      ┌───────────────────────┐
      │ const value: "string" │
      └───────────────────────┘
     */
  }
  ```
> [!TIP]
> Use `literal` to match a literal primitive type like "string" or "number".
- **Class** type
  ```ts
  if (is(value, Date)) {
    value
    /**
      ┌───────────────────┐
      │ const value: Date │
      └───────────────────┘
     */
  }
  ```
- **Union** type
  ```ts
  if (is(value, union("string", "number"))) {
    value
    /**
      ┌──────────────────────────────┐
      │ const value: string | number │
      └──────────────────────────────┘
     */
  }
  ```
- **Joint** type
  ```ts
  if (is(value, joint({ foo: "string" }, { bar: "number" }))) {
    value
    /**
      ┌───────────────────────────────────────────┐
      │ const value: { foo: string; bar: number } │
      └───────────────────────────────────────────┘
     */
  }
  ```
- **Array** type
  ```ts
  if (is(value, array("string"))) {
    value
    /**
      ┌───────────────────────┐
      │ const value: string[] │
      └───────────────────────┘
     */
  }
  ```
- **Tuple** type
  ```ts
  if (is(value, ["string", "number"])) {
    value
    /**
      ┌───────────────────────────────┐
      │ const value: [string, number] │
      └───────────────────────────────┘
     */
  }
  ```
> [!NOTE]
> `tuple` can also be used to define a tuple type.
> ```ts
> if (is(value, tuple("string", "number"))) {
>   value
>   /**
>     ┌───────────────────────────────┐
>     │ const value: [string, number] │
>     └───────────────────────────────┘
>    */
> }
> ```
- Record type: **collective** keys
  ```ts
  if (is(value, record("string", "number"))) {
    value
    /**
      ┌─────────────────────────────────────┐
      │ const value: Record<string, number> │
      └─────────────────────────────────────┘
     */
  }
  ```
- Record type: **concrete** keys
  ```ts
  if (is(value, record(["foo", "bar"], "string"))) {
    value
    /**
      ┌────────────────────────────────────────────┐
      │ const value: Record<"foo" | "bar", string> │
      └────────────────────────────────────────────┘
     */
  }
  ```
- Simple schema
  ```ts
  if (is(value, { foo: "string" })) {
    value
    /**
      ┌──────────────────────────────┐
      │ const value: { foo: string } │
      └──────────────────────────────┘
     */
  }
  ```
> [!NOTE]
> By default, `is` does an exact match on the schema. To allow extra properties, pass `false` as the third argument.
> ```ts
> is({ foo: 1, bar: 2 }, { foo: "number" }) // false
> is({ foo: 1, bar: 2 }, { foo: "number" }, false) // true
> ```
- Complex schema
  ```ts
  if (is(value, Profile)) {
    value
    /**
      ┌───────────────────────────────────────────────┐
      │ const value: {                                │
      │     user: {                                   │
      │         userid: string;                       │
      │         name: string;                         │
      │         age: number;                          │
      │         email: string;                        │
      │         deleted: boolean;                     │
      │     };                                        │
      │     address: {                                │
      │         street: string;                       │
      │         city: string;                         │
      │         zipcode: string;                      │
      │         country: string;                      │
      │     };                                        │
      │     settings: {                               │
      │         theme: "light" | "dark";              │
      │         notifications: {                      │
      │             email?: boolean | undefined;      │
      │             sms?: boolean | undefined;        │
      │         };                                    │
      │     };                                        │
      │     roles: ("admin" | "editor" | "viewer")[]; │
      │     posts: {                                  │
      │         id: string;                           │
      │         title: string;                        │
      │         body: string;                         │
      │         attachment?: string | undefined;      │
      │         publishedAt: number;                  │
      │         tags: string[];                       │
      │     }[];                                      │
      │     friends: {                                │
      │         userid: string;                       │
      │         name: string;                         │
      │         startedAt: number;                    │
      │     }[];                                      │
      │ }                                             │
      └───────────────────────────────────────────────┘
     */
  }
  ```

<details>
  <summary>Show <code>Profile</code> schema</summary>

  ```ts
  const User = {
    userid: primitive("string"),
    name: primitive("string"),
    age: primitive("number"),
    email: primitive("string"),
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
  ```
</details>

## API

### Core Functionality

[`is(value, type, exact?)`](src/is.ts)\
Check if `value` matches `type`, allowing extra properties if `exact` is false.

[`has(value, prop, type?, exact?)`](src/has.ts)\
Check if `value` has property `prop` that matches some optional `type`, allowing extra properties if `exact` is false.

[`assert(condition, message)`](src/assert.ts)\
Throw an error with `message` if `condition` is false.

> [!TIP]
> Combine `assert` with `is` or `has` to narrow types at runtime effectively.
> ```ts
> assert(is(value, "string"), "Value must be a string")
> value
> /**
>   ┌─────────────────────┐
>   │ const value: string │
>   └─────────────────────┘
>  */
> ```

### Type Descriptors

[`primitive(type)`](src/primitive.ts)\
Define a primitive type such as "string" or "number".

> [!TIP]
> Use `primitive` to define a primitive property in a schema.
> ```ts
> const Foo = { foo: primitive("number") }
> /**
>   ┌──────────────────────────────┐
>   │ const Foo: { foo: "number" } │
>   └──────────────────────────────┘
>  */
> if (is(value, Foo)) {
>   value
>   /**
>     ┌──────────────────────────────┐
>     │ const value: { foo: number } │
>     └──────────────────────────────┘
>    */
> }
> ```

[`literal(type)`](src/literal.ts)\
Define a literal type such as `literal("hello")` or `literal(42)`.

> [!TIP]
> Use `literal` to define a literal property in a schema and/or to match a literal primitive type.
> ```ts
> const Bar = { bar: literal("number") }
> /**
>   ┌───────────────────────────────────────┐
>   │ const Bar: { bar: Literal<"number"> } │
>   └───────────────────────────────────────┘
>  */
> if (is(value, Bar)) {
>   value
>   /**
>     ┌────────────────────────────────┐
>     │ const value: { bar: "number" } │
>     └────────────────────────────────┘
>    */
> }
> ```

[`union(...types)`](src/union.ts)\
Define a union type that matches _one of_ `types`.

[`joint(...types)`](src/joint.ts)\
Define a joint type that matches _all of_ `types`.

[`array(type)`](src/array.ts)\
Define an array type where every element matches `type`.

[`tuple(...types)`](src/tuple.ts)\
Define a tuple type where every element matches the corresponding type in `types`.

> [!IMPORTANT]
> The length must be **exactly** the same as `types`.

[`record(props, type)`](src/record.ts)\
Define a record type that matches a plain object with `props`, where all values match `type`.

> [!NOTE]
> A _collective_ record such as `record("string", "number")` checks that every prop matches `props`.
>
> A _concrete_ record such as `record(["foo", "bar"], "number")` checks that all `props` are present.

[`partial(record)`](src/partial.ts)\
Convert all properties of `record` to optional.

> [!NOTE]
> `partial` only works with concrete records or schemas. To create a partial collective schema, wrap the value type in `optional` instead.

[`optional(type)`](src/optional.ts)\
Define an optional property that matches `type`.

[`readonly(type)`](src/readonly.ts)\
Define a readonly property that matches `type`.

### Utility Functions

[`json(value)`](src/json.ts)\
Check if `value` is a JSON value.

[`propertyKey(value)`](src/utils/is-property-key.ts)\
Check if `value` is a property key.

[`get(object, prop)`](src/utils/get-value.ts)\
Get the value of `prop` for `object`, binding to `object` if applicable.

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
