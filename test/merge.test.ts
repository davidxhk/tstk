import { describe, expect, it } from "vitest"
import { merge } from "../src/merge"

describe("the mergeObjects function", () => {
  it("merges two objects with distinct keys", () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { c: 3 }
    const result = merge(obj1, obj2)

    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it("overwrites keys if the latter object has the same key", () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { b: 10, c: 3 }
    const result = merge(obj1, obj2)

    expect(result).toEqual({ a: 1, b: 10, c: 3 })
  })

  it("merges three objects", () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { b: 10, c: 3 }
    const obj3 = { c: 30, d: 4 }
    const result = merge(obj1, obj2, obj3)

    expect(result).toEqual({ a: 1, b: 10, c: 30, d: 4 })
  })

  it("merges four objects", () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { b: 10, c: 3 }
    const obj3 = { c: 30, d: 4 }
    const obj4 = { a: 100, e: 5 }
    const result = merge(obj1, obj2, obj3, obj4)

    expect(result).toEqual({ a: 100, b: 10, c: 30, d: 4, e: 5 })
  })

  it("merges five objects", () => {
    const obj1 = { a: 1 }
    const obj2 = { b: 2 }
    const obj3 = { c: 3 }
    const obj4 = { d: 4 }
    const obj5 = { a: 100, e: 5 }
    const result = merge(obj1, obj2, obj3, obj4, obj5)

    expect(result).toEqual({ a: 100, b: 2, c: 3, d: 4, e: 5 })
  })

  it("merges six objects", () => {
    const obj1 = { a: 1 }
    const obj2 = { b: 2 }
    const obj3 = { c: 3 }
    const obj4 = { d: 4 }
    const obj5 = { a: 100, e: 5 }
    const obj6 = { f: 6, b: 200 }

    const result = merge(obj1, obj2, obj3, obj4, obj5, obj6)
    expect(result).toEqual({ a: 100, b: 200, c: 3, d: 4, e: 5, f: 6 })
  })

  it("does not mutate the original objects", () => {
    const obj1 = { a: 1 }
    const obj2 = { b: 2 }

    const merged = merge(obj1, obj2)

    expect(merged).toEqual({ a: 1, b: 2 })
    expect(obj1).toEqual({ a: 1 })
    expect(obj2).toEqual({ b: 2 })
  })
})
