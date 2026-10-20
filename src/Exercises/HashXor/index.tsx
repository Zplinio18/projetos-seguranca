import { useMemo, useState } from "react";
import { FiCode, FiHash, FiPlay, FiShield } from "react-icons/fi";
import { hashSource, simpleXorHash } from "./algorithm";

type Tab = "run" | "code";

function HashXorExercise() {
  const [tab, setTab] = useState<Tab>("run");
  const [text, setText] = useState("Segurança de Sistemas Computacionais");
  const hash = useMemo(() => simpleXorHash(text), [text]);

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
          Exercício 09
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hash simples com XOR e rotação
        </h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Demonstração de como bytes podem ser misturados em um valor fixo de 32
          bits usando operações simples.
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
              algorithm.ts
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-7 text-cyan-50">
              <code>{hashSource}</code>
            </pre>
          </section>
        ) : (
          <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_0.9fr]">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <div className="flex items-center gap-2">
                <FiHash className="text-cyan-300" />
                <h2 className="font-bold">Texto de entrada</h2>
              </div>
              <label className="mt-5 block text-sm font-semibold text-slate-300">
                Mensagem
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  className="mt-2 min-h-40 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>
              <p className="mt-3 text-xs text-slate-500">
                {new TextEncoder().encode(text).length} bytes processados em
                UTF-8.
              </p>
            </section>
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <h2 className="font-bold">Hash de 32 bits</h2>
              <p className="mt-2 text-sm text-slate-400">
                O resultado muda quando qualquer byte da entrada muda.
              </p>
              <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Resultado hexadecimal
                </p>
                <output className="mt-3 block break-all font-mono text-3xl font-bold tracking-wider text-cyan-50">
                  {hash}
                </output>
                <p className="mt-3 font-mono text-xs text-cyan-200/70">
                  0x{hash}
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default HashXorExercise;
