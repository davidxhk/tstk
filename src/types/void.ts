/**
 * Make all properties in T undefined
 */
export type Void<T> = { [P in keyof T]?: never }
