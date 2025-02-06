/**
 * A JSON value which can be a primitive value, an array of JSON values, a record with JSON values, or `null`
 */
export type Json = string | number | boolean | Json[] | { [key: string]: Json } | null
