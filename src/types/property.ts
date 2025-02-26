import type { Any } from "."

/**
 * A property descriptor that may contain a type and be marked optional and/or readonly
 */
export type Property =
  { type: Any, optional: true, readonly: true } |
  { type: Any, optional: true } |
  { type: Any, readonly: true } |
  { type: Any } |
  { optional: true, readonly: true } |
  { optional: true } |
  { readonly: true }
