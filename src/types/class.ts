/**
 * A class constructor that returns an instance of T
 */
export type Class<T> = abstract new (...args: any) => T
