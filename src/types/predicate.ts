/**
 * A type predicate which checks if a value is T
 */
export type Predicate<T> = (value: unknown) => value is T
