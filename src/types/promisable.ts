/**
 * A value that can be either T or a Promise-like object that resolves to T
 */
export type Promisable<T> = T | PromiseLike<T>
