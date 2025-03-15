import type { Type } from "tstk"
import { inspect } from "util"
import { array, boolean, is, merge, number, optional, partial, pick, record, string, union } from "tstk"

const UserSchema = {
  userid: string,
  name: string,
  age: number,
  email: string,
  deleted: boolean,
}

type User = Type<typeof UserSchema>

const AddressSchema = record(["street", "city", "zipcode", "country"], "string")

type Address = Type<typeof AddressSchema>

const SettingsSchema = {
  theme: union("light", "dark"),
  notifications: partial(record(["email", "sms"], "boolean")),
}

type Settings = Type<typeof SettingsSchema>

const RoleSchema = union("admin", "editor", "viewer")

type Role = Type<typeof RoleSchema>

const PostSchema = {
  id: string,
  title: string,
  body: string,
  attachment: optional("string"),
  publishedAt: number,
  tags: array("string"),
}

type Post = Type<typeof PostSchema>

const FriendSchema = merge(
  pick(UserSchema, ["userid", "name"]),
  { startedAt: "number" },
)

type Friend = Type<typeof FriendSchema>

const ProfileSchema = {
  user: UserSchema,
  address: AddressSchema,
  settings: SettingsSchema,
  roles: array(RoleSchema),
  posts: array(PostSchema),
  friends: array(FriendSchema),
}

type Profile = Type<typeof ProfileSchema>

const value = JSON.parse(`{
  "user": {
    "userid": "12345",
    "name": "John Doe",
    "age": 30,
    "email": "john.doe@example.com",
    "deleted": false
  },
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipcode": "10001",
    "country": "USA"
  },
  "settings": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "sms": false
    }
  },
  "roles": ["admin", "editor"],
  "posts": [
    {
      "id": "post_001",
      "title": "My First Post",
      "body": "This is the content of my first post.",
      "attachment": "https://example.com/image1.png",
      "publishedAt": 1709900000000,
      "tags": ["introduction", "welcome"]
    },
    {
      "id": "post_002",
      "title": "Tech Trends 2025",
      "body": "Exploring the latest technology trends for 2025.",
      "publishedAt": 1710000000000,
      "tags": ["tech", "future", "innovation"]
    }
  ],
  "friends": [
    {
      "userid": "67890",
      "name": "Jane Smith",
      "startedAt": 1695000000000
    },
    {
      "userid": "54321",
      "name": "Bob Johnson",
      "startedAt": 1680000000000
    }
  ]
}`)

if (is(value, ProfileSchema)) {
  console.log(`${inspect(value)} is Profile`)
}
