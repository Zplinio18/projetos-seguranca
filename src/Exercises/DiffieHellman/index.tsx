import { useState } from "react";
import { FiCheckCircle, FiCode, FiPlay, FiShield } from "react-icons/fi";
import { a, b, executeDiffieHellman, g, p } from "./algorithm";

type Tab = "run" | "code";
const source = `export function executeDiffieHellman() {
  const publicA = modPow(g, a, p); // A = g^a mod p
  const publicB = modPow(g, b, p); // B = g^b mod p

  // Cada parte usa o valor público recebido e sua chave privada.
  const secretFromA = modPow(publicB, a, p); // B^a mod p
  const secretFromB = modPow(publicA, b, p); // A^b mod p

  if (secretFromA !== secretFromB) throw new Error("Segredos diferentes");
  return { publicA, publicB, secretFromA, secretFromB };
}`;

function DiffieHellmanExercise() {
  const [tab, setTab] = useState<Tab>("run");
  const [result, setResult] = useState<ReturnType<
    typeof executeDiffieHellman
  > | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4 sm:px-8">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400 text-slate-950">
            <FiShield size={21} />
          </span>
          <p className="font-bold">
            DCC-075: Segurança em sistemas de computação
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
          Exercício 08
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Diffie-Hellman — Compartilhamento de segredo
        </h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Alice e Bob calculam o mesmo segredo sem transmiti-lo pela rede.
          Apenas A e B são valores públicos.
        </p>
        <div className="mt-8 flex gap-2 border-b border-slate-800">
          <button
            onClick={() => setTab("run")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold ${tab === "run" ? "border-cyan-300 text-cyan-300" : "border-transparent text-slate-400"}`}
          >
            <FiPlay /> Executar
          </button>
          <button
            onClick={() => setTab("code")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold ${tab === "code" ? "border-cyan-300 text-cyan-300" : "border-transparent text-slate-400"}`}
          >
            <FiCode /> Código
          </button>
        </div>
        {tab === "code" ? (
          <section className="mt-7 overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1117]">
            <div className="border-b border-slate-800 px-5 py-3 text-sm text-slate-400">
              algorithm.ts — núcleo do algoritmo
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-7 text-cyan-50">
              <code>{source}</code>
            </pre>
          </section>
        ) : (
          <div className="mt-7 grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <h2 className="font-bold">Valores escolhidos</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {[
                  ["p", p, "Primo público"],
                  ["g", g, "Raiz primitiva"],
                  ["a", a, "Privado de Alice"],
                  ["b", b, "Privado de Bob"],
                ].map(([label, value, description]) => (
                  <div
                    key={label as string}
                    className="rounded-xl bg-slate-950 p-3"
                  >
                    <p className="font-mono text-xs text-slate-500">
                      {label as string} · {description as string}
                    </p>
                    <p className="mt-1 font-mono font-bold text-cyan-300">
                      {String(value)}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setResult(executeDiffieHellman())}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                <FiPlay /> Executar troca de chaves
              </button>
            </section>
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <h2 className="font-bold">Cálculo da troca</h2>
              {result ? (
                <div className="mt-5 space-y-3">
                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">
                      A = g<sup>a</sup> mod p · público de Alice
                    </p>
                    <p className="mt-1 font-mono text-xl font-bold text-cyan-300">
                      {result.publicA.toString()}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">
                      B = g<sup>b</sup> mod p · público de Bob
                    </p>
                    <p className="mt-1 font-mono text-xl font-bold text-cyan-300">
                      {result.publicB.toString()}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                    <p className="flex items-center gap-2 text-sm text-emerald-200">
                      <FiCheckCircle /> Segredo compartilhado confirmado
                    </p>
                    <p className="mt-2 font-mono text-2xl font-bold text-emerald-300">
                      s = {result.secretFromA.toString()}
                    </p>
                    <p className="mt-2 text-xs text-emerald-200/70">
                      B<sup>a</sup> mod p = A<sup>b</sup> mod p ={" "}
                      {result.secretFromB.toString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-5 grid min-h-64 place-items-center rounded-xl bg-slate-950 text-sm text-slate-500">
                  Clique em “Executar troca de chaves”.
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default DiffieHellmanExercise;
