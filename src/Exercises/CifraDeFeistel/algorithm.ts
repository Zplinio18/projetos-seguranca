const ROUNDS = 16;
const BLOCK_SIZE = 8;

// Rotaciona os bits à esquerda. O >>> garante um número sem sinal de 32 bits.
function rotateLeft(value: number, bits: number) {
  return ((value << bits) | (value >>> (32 - bits))) >>> 0;
}

// Função F propositalmente simples: mistura a metade direita com a subchave.
// XOR é reversível, que é justamente a propriedade aproveitada pela rede de Feistel.
function roundFunction(right: number, key: number) {
  return (rotateLeft(right, 5) ^ key) >>> 0;
}

// Cria 16 subchaves determinísticas a partir de uma senha de demonstração.
function createRoundKeys(password: string) {
  let seed = 0x9e3779b9;
  for (const character of password)
    seed = (seed * 31 + character.charCodeAt(0)) >>> 0;

  return Array.from({ length: ROUNDS }, (_, index) => {
    seed = (rotateLeft(seed, 3) ^ (0x6d2b79f5 + index)) >>> 0;
    return seed;
  });
}

function readUint32(bytes: Uint8Array, offset: number) {
  return (
    ((bytes[offset] << 24) |
      (bytes[offset + 1] << 16) |
      (bytes[offset + 2] << 8) |
      bytes[offset + 3]) >>>
    0
  );
}

function writeUint32(bytes: Uint8Array, offset: number, value: number) {
  bytes[offset] = value >>> 24;
  bytes[offset + 1] = value >>> 16;
  bytes[offset + 2] = value >>> 8;
  bytes[offset + 3] = value;
}

function encryptBlock(left: number, right: number, keys: number[]) {
  for (const key of keys) {
    const nextLeft = right;
    const nextRight = (left ^ roundFunction(right, key)) >>> 0;
    left = nextLeft;
    right = nextRight;
  }
  return [left, right];
}

function decryptBlock(left: number, right: number, keys: number[]) {
  // As mesmas operações são usadas, mas as subchaves entram em ordem inversa.
  for (const key of [...keys].reverse()) {
    const previousRight = left;
    const previousLeft = (right ^ roundFunction(left, key)) >>> 0;
    left = previousLeft;
    right = previousRight;
  }
  return [left, right];
}

function processBlocks(bytes: Uint8Array, keys: number[], decrypt = false) {
  const result = new Uint8Array(bytes.length);
  for (let offset = 0; offset < bytes.length; offset += BLOCK_SIZE) {
    const [left, right] = decrypt
      ? decryptBlock(
          readUint32(bytes, offset),
          readUint32(bytes, offset + 4),
          keys,
        )
      : encryptBlock(
          readUint32(bytes, offset),
          readUint32(bytes, offset + 4),
          keys,
        );
    writeUint32(result, offset, left);
    writeUint32(result, offset + 4, right);
  }
  return result;
}

export function encryptFeistel(message: string, password: string) {
  const data = new TextEncoder().encode(message);
  // PKCS#7: inclusive quando o texto já ocupa blocos completos.
  const padding = BLOCK_SIZE - (data.length % BLOCK_SIZE);
  const padded = new Uint8Array(data.length + padding);
  padded.set(data);
  padded.fill(padding, data.length);
  return processBlocks(padded, createRoundKeys(password));
}

export function decryptFeistel(ciphertext: Uint8Array, password: string) {
  const data = processBlocks(ciphertext, createRoundKeys(password), true);
  const padding = data[data.length - 1];
  if (!padding || padding > BLOCK_SIZE)
    throw new Error("Chave ou texto cifrado inválido.");
  return new TextDecoder().decode(data.slice(0, -padding));
}

export function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export const feistelSource = `const ROUNDS = 16;

// Rotaciona os bits à esquerda e mantém o resultado em 32 bits sem sinal.
function rotateLeft(value: number, bits: number) {
  return ((value << bits) | (value >>> (32 - bits))) >>> 0;
}

// Função F simples: XOR entre a metade direita rotacionada e a subchave.
function roundFunction(right: number, key: number) {
  return (rotateLeft(right, 5) ^ key) >>> 0;
}

function encryptBlock(left: number, right: number, keys: number[]) {
  for (const key of keys) { // 16 rodadas
    const nextLeft = right;
    const nextRight = (left ^ roundFunction(right, key)) >>> 0;
    left = nextLeft;
    right = nextRight;
  }
  return [left, right];
}

function decryptBlock(left: number, right: number, keys: number[]) {
  // Uma rede de Feistel é revertida ao aplicar as subchaves na ordem inversa.
  for (const key of [...keys].reverse()) {
    const previousRight = left;
    const previousLeft = (right ^ roundFunction(left, key)) >>> 0;
    left = previousLeft;
    right = previousRight;
  }
  return [left, right];
}`;
