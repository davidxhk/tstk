import { literal } from "../src/literal"

export const strings = ["a", "b"]

export const numbers = [1, 2, Infinity, Number.NaN]

export const bigints = [1n, 2n]

export const booleans = [true, false]

export const symbols = [Symbol("a"), Symbol.for("b")]

export const literals = [literal("string"), literal("number"), literal(null), literal(undefined)]

export class Class { }

export const predicate = (value: unknown): value is string => typeof value === "string"

export const functions = [Class, predicate, function () { }]

export const records = [{}, Object.create(null)]

export const arrays = [[], Array.from({ length: 0 })]

export const instance = new Class()

export const regexp = /./

export const date = new Date()

export const objects = [...literals, ...functions, ...records, ...arrays, instance, regexp, date]

export const all = [...strings, ...numbers, ...bigints, ...booleans, ...symbols, ...objects, null, undefined]
