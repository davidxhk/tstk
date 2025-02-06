export const isPropertyKey = (value: unknown): value is PropertyKey => ["string", "number", "symbol"].includes(typeof value)
