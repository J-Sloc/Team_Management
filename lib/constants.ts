// lib/constants.ts

// Track & Field Events (common high school events)
export const TRACK_EVENTS = [
  "60m",
  "100m",
  "200m",
  "300m",
  "400m",
  "800m",
  "1600m",
  "3200m",
  "100m Hurdles",
  "110m Hurdles",
  "300m Hurdles",
  "400m Hurdles",
  "4x100m Relay",
  "4x200m Relay",
  "4x400m Relay",
  "4x800m Relay",
  "High Jump",
  "Long Jump",
  "Triple Jump",
  "Pole Vault",
  "Shot Put",
  "Discus",
  "Javelin",
  "Hammer Throw",
] as const;

// Helper to parse enum values safely
export function parseEnum<T extends Record<string, string | number>>(
  enumObj: T,
  value: string | null | undefined
): T[keyof T] | null {
  if (!value) return null;
  const values = Object.values(enumObj) as (string | number)[];
  return values.includes(value) ? (value as T[keyof T]) : null;
}