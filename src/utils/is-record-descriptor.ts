import type { RecordDescriptor } from "../types"
import { isDescriptor, isPropertyKey, isRecord, keys } from "."

/**
 * Match record descriptors
 */
export const isRecordDescriptor = (value: unknown): value is RecordDescriptor => isRecord(value) && keys(value).every(prop => isPropertyKey(prop) && isDescriptor(value[prop]))
