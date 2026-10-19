/**
 * Diffie-Hellman (DH) para demonstração de compartilhamento de segredo.
 * p é primo e g = 12 é uma raiz primitiva módulo p.
 * Os valores privados a e b são apenas didáticos e não devem ser expostos
 * em uma implementação real.
 */
export const p: bigint = 104729n;
export const g: bigint = 12n;
export const a: bigint = 12345n;
export const b: bigint = 67890n;

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  let result = 1n;
  let currentBase = base % modulus;
  let currentExponent = exponent;

  while (currentExponent > 0n) {
    if (currentExponent & 1n) result = (result * currentBase) % modulus;
    currentBase = (currentBase * currentBase) % modulus;
    currentExponent >>= 1n;
  }

  return result;
}

function isPrime(value: bigint): boolean {
  if (value < 2n) return false;
  for (let divisor = 2n; divisor * divisor <= value; divisor += 1n) {
    if (value % divisor === 0n) return false;
  }
  return true;
}

function uniquePrimeFactors(value: bigint): bigint[] {
  const factors: bigint[] = [];
  let remaining = value;

  for (let divisor = 2n; divisor * divisor <= remaining; divisor += 1n) {
    if (remaining % divisor !== 0n) continue;
    factors.push(divisor);
    while (remaining % divisor === 0n) remaining /= divisor;
  }
  if (remaining > 1n) factors.push(remaining);
  return factors;
}

/** Confere se g é raiz primitiva módulo p. */
export function isPrimitiveRoot(candidate: bigint, prime: bigint): boolean {
  if (!isPrime(prime)) return false;
  return uniquePrimeFactors(prime - 1n).every(
    (factor) => modPow(candidate, (prime - 1n) / factor, prime) !== 1n,
  );
}

export interface DiffieHellmanResult {
  publicA: bigint;
  publicB: bigint;
  secretFromA: bigint;
  secretFromB: bigint;
}

/**
 * A calcula A = g^a mod p; B calcula B = g^b mod p.
 * Ambos chegam ao mesmo segredo: s = B^a mod p = A^b mod p.
 */
export function executeDiffieHellman(): DiffieHellmanResult {
  if (!isPrime(p)) throw new Error("p deve ser primo.");
  if (!isPrimitiveRoot(g, p))
    throw new Error("g deve ser raiz primitiva módulo p.");
  if (a <= 0n || b <= 0n || a >= p - 1n || b >= p - 1n) {
    throw new Error("a e b devem estar no intervalo de 1 a p - 2.");
  }

  const publicA = modPow(g, a, p);
  const publicB = modPow(g, b, p);
  const secretFromA = modPow(publicB, a, p);
  const secretFromB = modPow(publicA, b, p);

  if (secretFromA !== secretFromB)
    throw new Error("Os segredos calculados não coincidem.");
  return { publicA, publicB, secretFromA, secretFromB };
}
