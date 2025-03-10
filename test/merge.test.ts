import { describe, expect, it } from "vitest"
import { merge } from "../src/merge"

describe("the merge function", () => {
  it("merges objects with distinct keys", () => {
    const obj1 = { a: 1 as const, b: 2 as const }
    const obj2 = { c: 3 as const }
    const result = merge(obj1, obj2)

    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it("does not mutate the original objects", () => {
    const obj1 = { a: 1 as const, b: 2 as const }
    const obj2 = { c: 3 as const }
    merge(obj1, obj2)

    expect(obj1).toEqual({ a: 1, b: 2 })
    expect(obj2).toEqual({ c: 3 })
  })

  it("overwrites keys if the latter object has the same key", () => {
    const obj1 = { a: 1 as const, b: 2 as const }
    const obj2 = { b: 10 as const, c: 3 as const }
    const result = merge(obj1, obj2)

    expect(result).toEqual({ a: 1, b: 10, c: 3 })
  })

  it("merges three objects", () => {
    const obj1 = { a: 1 as const, b: 2 as const }
    const obj2 = { b: 10 as const, c: 3 as const }
    const obj3 = { c: 30 as const, d: 4 as const }
    const result = merge(obj1, obj2, obj3)

    expect(result).toEqual({ a: 1, b: 10, c: 30, d: 4 })
  })

  it("merges four objects", () => {
    const obj1 = { a: 1 as const, b: 2 as const }
    const obj2 = { b: 10 as const, c: 3 as const }
    const obj3 = { c: 30 as const, d: 4 as const }
    const obj4 = { a: 100 as const, e: 5 as const }
    const result = merge(obj1, obj2, obj3, obj4)

    expect(result).toEqual({ a: 100, b: 10, c: 30, d: 4, e: 5 })
  })

  it("merges five objects", () => {
    const obj1 = { a: 1 as const }
    const obj2 = { b: 2 as const }
    const obj3 = { c: 3 as const }
    const obj4 = { d: 4 as const }
    const obj5 = { a: 100 as const, e: 5 as const }
    const result = merge(obj1, obj2, obj3, obj4, obj5)

    expect(result).toEqual({ a: 100, b: 2, c: 3, d: 4, e: 5 })
  })

  it("merges six objects", () => {
    const obj1 = { a: 1 as const }
    const obj2 = { b: 2 as const }
    const obj3 = { c: 3 as const }
    const obj4 = { d: 4 as const }
    const obj5 = { a: 100 as const, e: 5 as const }
    const obj6 = { f: 6 as const, b: 200 as const }

    const result = merge(obj1, obj2, obj3, obj4, obj5, obj6)
    expect(result).toEqual({ a: 100, b: 200, c: 3, d: 4, e: 5, f: 6 })
  })
})
