import { isFunction } from "./is-function"

export const getProp = <T extends object, K extends keyof T>(object: T, prop: K): T[K] => isFunction(object[prop]) ? object[prop].bind(object) as T[K] : object[prop]
