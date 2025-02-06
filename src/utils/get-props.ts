import { asInteger } from "./as-integer"

export const getProps = <T extends object>(object: T): (keyof T)[] => Reflect.ownKeys(object).map(prop => (asInteger(prop) || prop) as keyof T)
