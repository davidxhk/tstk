/**
 * Cast a value to an integer
 */
export const integer = (value: unknown): number | undefined => /^\d+$/.test(String(value)) ? Number.parseInt(String(value)) : undefined
