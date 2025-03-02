import { $value } from "../symbols"

/**
 * A wrapper that encapsulates a literal value T
 */
export class Literal<const T> {
  [$value]: T
  constructor(value: T) {
    this[$value] = value
  }
}
