// generateTK.ts
const ORIGINAL = "TK from 凛として時雨";

function shuffle<T extends NonNullable<unknown>>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

export function generateTKText(): string {
  if (Math.random() < 0.001) return ORIGINAL;

  const chars = ORIGINAL.replace(/\s/g, "").split("");
  const shuffled = shuffle(chars);

  const part1 = shuffled.slice(0, 2).join("");
  const part2 = shuffled.slice(2, 6).join("");
  const part3 = shuffled.slice(6, 12).join("");

  return `${part1} ${part2} ${part3}`;
}