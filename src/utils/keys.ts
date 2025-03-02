import { integer } from "."

/**
 * Get all property keys of T
 */
export const keys = <T extends object>(object: T): (keyof T)[] => Reflect.ownKeys(object).map(prop => (integer(prop) ?? prop) as keyof T)
