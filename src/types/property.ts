import type { Descriptor } from "."

/**
 * A type descriptor that represents a property
 */
export type Property =
  { type: Descriptor, optional: true, readonly: true } |
  { type: Descriptor, optional: true } |
  { type: Descriptor, readonly: true } |
  { type: Descriptor } |
  { optional: true, readonly: true } |
  { optional: true } |
  { readonly: true }
