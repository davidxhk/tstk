/**
 * Assert that T is true, or throw an error with the given message otherwise
 */
export function assert<T>(condition: T, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}
