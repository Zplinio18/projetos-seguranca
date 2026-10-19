import { a, b, executeDiffieHellman, g, p } from "./algorithm.ts";

const result = executeDiffieHellman();

console.log("Diffie-Hellman executado com sucesso.");
console.log(`p = ${p} (primo)`);
console.log(`g = ${g} (raiz primitiva módulo p)`);
console.log(`a = ${a} (segredo privado de Alice)`);
console.log(`b = ${b} (segredo privado de Bob)`);
console.log(`A = g^a mod p = ${result.publicA} (valor público de Alice)`);
console.log(`B = g^b mod p = ${result.publicB} (valor público de Bob)`);
console.log(`s = B^a mod p = ${result.secretFromA} (segredo de Alice)`);
console.log(`s = A^b mod p = ${result.secretFromB} (segredo de Bob)`);
