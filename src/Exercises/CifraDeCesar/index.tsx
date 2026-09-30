import { useMemo, useState } from "react";
import {
  FiBarChart2,
  FiCode,
  FiCopy,
  FiKey,
  FiLock,
  FiPlay,
  FiShield,
} from "react-icons/fi";
import { analyzeFrequency, caesarSource, encryptCaesar } from "./algorithm";

type Tab = "run" | "code";

const portugueseReference = ["A", "E", "O", "S", "R", "I", "N", "D", "M", "U"];

function CaesarExercise() {
  const [tab, setTab] = useState<Tab>("run");
  const [text, setText] = useState(
    "A segurança da informação protege os dados da escola.",
  );
  const [key, setKey] = useState(3);
  const [copied, setCopied] = useState(false);
  const encrypted = useMemo(() => encryptCaesar(text, key), [text, key]);
  const frequency = useMemo(() => analyzeFrequency(encrypted), [encrypted]);
  const maxCount = frequency[0]?.count || 1;

  async function copyCode() {
    await navigator.clipboard.writeText(caesarSource);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4 sm:px-8">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400 text-slate-950">
            <FiShield size={21} />
          </span>
          <p className="font-bold">DCC-075: Segurança em sistemas de computação</p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
        Exercício 03
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Cifra de César e criptoanálise
        </h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Desloque cada letra pela chave escolhida e observe a frequência do
          texto cifrado para entender uma das fraquezas desse método clássico.
        </p>
        <div className="mt-8 flex gap-2 border-b border-slate-800">
          <button
            onClick={() => setTab("run")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${tab === "run" ? "border-cyan-300 text-cyan-300" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <FiPlay /> Executar
          </button>
          <button
            onClick={() => setTab("code")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition ${tab === "code" ? "border-cyan-300 text-cyan-300" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <FiCode /> Código do algoritmo
          </button>
        </div>
        {tab === "code" ? (
          <section className="mt-7 overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1117] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
              <span className="text-sm font-medium text-slate-400">
                algorithm.ts
              </span>
              <button
                onClick={copyCode}
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold transition hover:bg-slate-700"
              >
                <FiCopy />
                {copied ? "Copiado" : "Copiar código"}
              </button>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-7 text-cyan-50">
              <code>{caesarSource}</code>
            </pre>
          </section>
        ) : (
          <div className="mt-7 grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <div className="flex items-center gap-2">
                <FiKey className="text-cyan-300" />
                <h2 className="font-bold">Cifrar mensagem</h2>
              </div>
              <label className="mt-5 block text-sm font-semibold text-slate-300">
                Mensagem original
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  className="mt-2 min-h-32 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>
              <label className="mt-5 block text-sm font-semibold text-slate-300">
                Chave de deslocamento:{" "}
                <span className="text-cyan-300">{key}</span>
                <input
                  type="range"
                  min="1"
                  max="26"
                  value={key}
                  onChange={(event) => setKey(Number(event.target.value))}
                  className="mt-3 block w-full accent-cyan-300"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>1</span>
                  <span>13</span>
                  <span>26</span>
                </div>
              </label>
              <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Resultado cifrado
                </p>
                <p className="mt-2 break-words font-mono leading-7 text-cyan-50">
                  {encrypted || "Digite uma mensagem para cifrar."}
                </p>
              </div>
            </section>
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <div className="flex items-center gap-2">
                <FiBarChart2 className="text-violet-300" />
                <h2 className="font-bold">Criptoanálise por frequência</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                A análise compara as letras mais recorrentes do texto cifrado.
                Em português, a ordem esperada começa por{" "}
                <strong className="text-slate-200">AEOSR INDMU</strong>.
              </p>
              <div className="mt-5 space-y-2.5">
                {frequency.length ? (
                  frequency.slice(0, 10).map((item) => (
                    <div
                      key={item.letter}
                      className="grid grid-cols-[24px_1fr_42px] items-center gap-3 text-sm"
                    >
                      <span className="font-mono font-bold text-cyan-300">
                        {item.letter}
                      </span>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                          style={{ width: `${(item.count / maxCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-right text-xs text-slate-400">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="py-10 text-center text-sm text-slate-500">
                    Digite letras para gerar a análise.
                  </p>
                )}
              </div>
              <div className="mt-6 rounded-xl bg-slate-950 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Referência em português
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {portugueseReference.map((letter, index) => (
                    <span
                      key={letter}
                      className="rounded-md bg-slate-800 px-2.5 py-1 font-mono text-sm text-slate-300"
                    >
                      {index + 1}. {letter}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-5 flex gap-2 text-xs leading-5 text-slate-500">
                <FiLock className="mt-0.5 shrink-0" />
                Textos curtos ou muito específicos podem destoar da distribuição
                esperada; quanto maior a amostra, mais útil tende a ser a
                análise.
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default CaesarExercise;
