import { integer } from "."

/**
 * Get all properties of T
 */
export const getProps = <T extends object>(object: T): (keyof T)[] => Reflect.ownKeys(object).map(prop => (integer(prop) || prop) as keyof T)
