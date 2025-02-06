import type { SomeLiteral } from "../types"
import { Literal } from "./literal"

export const isLiteral = (value: unknown): value is SomeLiteral => value instanceof Literal
