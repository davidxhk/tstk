import type { Descriptor } from "."
import type { $optional, $readonly, $type } from "../symbols"

/**
 * A type descriptor that represents a property
 */
export type Property =
  { [$type]: Descriptor, [$optional]: true, [$readonly]: true } |
  { [$type]: Descriptor, [$optional]: true } |
  { [$type]: Descriptor, [$readonly]: true } |
  { [$type]: Descriptor } |
  { [$optional]: true, [$readonly]: true } |
  { [$optional]: true } |
  { [$readonly]: true }
