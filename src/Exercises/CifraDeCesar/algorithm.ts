const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encryptCaesar(text: string, key: number) {
  const shift = ((key % alphabet.length) + alphabet.length) % alphabet.length;

  return Array.from(text)
    .map((character) => {
      const upperCase = character.toUpperCase();
      const index = alphabet.indexOf(upperCase);
      if (index === -1) return character;

      const encrypted = alphabet[(index + shift) % alphabet.length];
      return character === upperCase ? encrypted : encrypted.toLowerCase();
    })
    .join("");
}

export interface LetterFrequency {
  letter: string;
  count: number;
  percentage: number;
}

export function analyzeFrequency(text: string): LetterFrequency[] {
  const letters = Array.from(text.toUpperCase()).filter((character) =>
    alphabet.includes(character),
  );
  const total = letters.length;

  return Array.from(alphabet)
    .map((letter) => ({
      letter,
      count: letters.filter((character) => character === letter).length,
      percentage: total
        ? (letters.filter((character) => character === letter).length / total) *
          100
        : 0,
    }))
    .filter((item) => item.count > 0)
    .sort((first, second) => second.count - first.count);
}

export const caesarSource = `const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encryptCaesar(text: string, key: number) {
  const shift = ((key % alphabet.length) + alphabet.length) % alphabet.length;

  return Array.from(text).map((character) => {
    const upperCase = character.toUpperCase();
    const index = alphabet.indexOf(upperCase);
    if (index === -1) return character;

    const encrypted = alphabet[(index + shift) % alphabet.length];
    return character === upperCase ? encrypted : encrypted.toLowerCase();
  }).join("");
}`;
