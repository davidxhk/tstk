/**
 * Construct from T a type where properties in P are optional, while others remain unchanged
 */
export type WithDefaults<T, P extends Partial<T>> = Omit<T, keyof P> & Partial<Pick<T, keyof T & keyof P>>
