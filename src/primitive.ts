import type { Primitive } from "./types"

/**
 * Define a primitive type
 */
export const primitive = <const T extends Primitive>(type: T): T => type
