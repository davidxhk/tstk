export const asInteger = (value: unknown): number | undefined => /^\d+$/.test(String(value)) ? Number.parseInt(String(value)) : undefined
