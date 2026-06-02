// Generates a unique color for each user from a curated palette
export const USER_COLORS = [
  "#3b82f6",
  "#818cf8",
  "#a78bfa",
  "#60a5fa",
  "#38bdf8",
  "#34d399",
  "#fb7185",
];

export function getRandomUserColor(): string {
  return USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
}

// Generates a random anonymous user name
export function getRandomUserName(): string {
  const adjectives = ["Swift", "Bright", "Sharp", "Bold", "Keen"];
  const nouns = ["Falcon", "Nova", "Pulse", "Spark", "Wave"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}

// Clamps a number between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Formats large numbers
export function formatCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

// Returns initials from a name string
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}