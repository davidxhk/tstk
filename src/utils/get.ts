import { isFunction } from "."

/**
 * Get from T the value of K, binding it to T if applicable
 */
export const get = <T extends object, K extends keyof T>(object: T, prop: K): T[K] => isFunction(object[prop]) ? object[prop].bind(object) as T[K] : object[prop]
