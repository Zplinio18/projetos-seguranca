import { writeFileSync } from "node:fs";
import { blumBlumShub, n, p, q, s, validateParameters } from "./algorithm.ts";

const amount = Number(process.argv[2] ?? "1000000");
const bitsPerLine = 128;

validateParameters();
const bitstream = blumBlumShub(amount);

// Arquivo fácil de abrir no editor: evita uma única linha gigantesca.
const readableBitstream =
  bitstream.match(new RegExp(`.{1,${bitsPerLine}}`, "g"))?.join("\n") ?? "";
writeFileSync("bb_bits.txt", `${readableBitstream}\n`, "utf-8");

// Arquivo sem quebras de linha, exclusivo para colar no testador NIST.
writeFileSync("bb_bits_nist.txt", bitstream, "utf-8");

console.log("Blum Blum Shub executado com sucesso.");
console.log(`p = ${p}`);
console.log(`q = ${q}`);
console.log(`s = ${s}`);
console.log(`n = ${n}`);
console.log(`Bits gerados = ${amount}`);
console.log("Arquivo legível gerado: bb_bits.txt");
console.log("Arquivo bruto para a suíte NIST: bb_bits_nist.txt");
