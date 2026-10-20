/**
 * Hash didático de 32 bits baseado em XOR e rotação de bits.
 * Não é seguro para senhas, assinaturas ou uso criptográfico real.
 */
function rotateLeft(value: number, bits: number): number {
  return ((value << bits) | (value >>> (32 - bits))) >>> 0;
}

export function simpleXorHash(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let hash = 0x811c9dc5;

  for (const byte of bytes) {
    // Mistura cada byte com o estado por XOR e desloca os bits por rotação.
    hash = (rotateLeft(hash, 5) ^ byte) >>> 0;
  }

  return hash.toString(16).padStart(8, "0").toUpperCase();
}

export const hashSource = `function rotateLeft(value: number, bits: number): number {
  return ((value << bits) | (value >>> (32 - bits))) >>> 0;
}

export function simpleXorHash(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let hash = 0x811c9dc5;

  for (const byte of bytes) {
    // XOR mistura o byte atual; a rotação muda sua posição no estado.
    hash = (rotateLeft(hash, 5) ^ byte) >>> 0;
  }

  // Retorna o estado de 32 bits como hexadecimal de 8 caracteres.
  return hash.toString(16).padStart(8, "0").toUpperCase();
}`;
