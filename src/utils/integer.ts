/**
 * Cast a value to an integer
 */
export const integer = (value: unknown): number | null => /^\d+$/.test(String(value)) ? Number.parseInt(String(value)) : null
