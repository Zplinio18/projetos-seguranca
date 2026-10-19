/**
 * Exercício 07 — Blum Blum Shub (BBS)
 *
 * Parâmetros escolhidos:
 * - p e q são primos distintos, maiores que 10.000 e congruentes a 3 (mod 4);
 * - s é coprimo com n = p × q.
 */
export const p: bigint = 10007n;
export const q: bigint = 10039n;
export const s: bigint = 12345n;
export const n = p * q;

function gcd(first: bigint, second: bigint): bigint {
  while (second !== 0n) {
    [first, second] = [second, first % second];
  }
  return first;
}

function isPrime(value: bigint): boolean {
  if (value < 2n) return false;
  for (let divisor = 2n; divisor * divisor <= value; divisor += 1n) {
    if (value % divisor === 0n) return false;
  }
  return true;
}

/** Confere todas as premissas solicitadas para os parâmetros do BBS. */
export function validateParameters(): void {
  if (!isPrime(p) || !isPrime(q)) throw new Error("p e q precisam ser primos.");
  if (p === q || p <= 10000n || q <= 10000n) {
    throw new Error("p e q devem ser distintos e maiores que 10.000.");
  }
  if (p % 4n !== 3n || q % 4n !== 3n) {
    throw new Error("p e q devem ser congruentes a 3 módulo 4.");
  }
  if (s <= 1n || s >= n || gcd(s, n) !== 1n) {
    throw new Error("s deve estar entre 1 e n e ser coprimo com n.");
  }
}

/**
 * Gera uma sequência de bits usando x(i+1) = x(i)² mod n.
 * O bit menos significativo de cada estado é a saída do gerador.
 */
export function blumBlumShub(amount: number): string {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("A quantidade de bits deve ser um inteiro positivo.");
  }

  validateParameters();
  let state = (s * s) % n;
  const bits = new Array<string>(amount);

  for (let index = 0; index < amount; index += 1) {
    state = (state * state) % n;
    bits[index] = (state & 1n).toString();
  }

  return bits.join("");
}
