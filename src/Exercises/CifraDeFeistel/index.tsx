import { useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiCode,
  FiCopy,
  FiKey,
  FiLock,
  FiPlay,
  FiShield,
} from "react-icons/fi";
import {
  decryptFeistel,
  encryptFeistel,
  feistelSource,
  toHex,
} from "./algorithm";

type Tab = "run" | "code";

function FeistelExercise() {
  const [tab, setTab] = useState<Tab>("run");
  const [message, setMessage] = useState("Mensagem confidencial da turma.");
  const [password, setPassword] = useState("seguranca-dcc075");
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const ciphertext = useMemo(
    () => encryptFeistel(message, password),
    [message, password],
  );
  const hex = useMemo(() => toHex(ciphertext), [ciphertext]);

  function decrypt() {
    try {
      setNotice(
        `Decriptação concluída: “${decryptFeistel(ciphertext, password)}”`,
      );
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : "Não foi possível decriptar.",
      );
    }
  }

  async function copyCode() {
    await navigator.clipboard.writeText(feistelSource);
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
          <p className="font-bold">
            DCC-075: Segurança em sistemas de computação
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
          Exercício 04
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Cifra de Feistel — 16 rodadas
        </h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Demonstração didática de uma rede de Feistel: a função{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-cyan-200">
            F
          </code>{" "}
          usa apenas rotação e XOR, e a decriptação inverte a ordem das
          subchaves.
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
            <FiCode /> Código comentado
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
              <code>{feistelSource}</code>
            </pre>
            <div className="border-t border-slate-800 bg-slate-900 px-5 py-4 text-sm text-slate-400">
              <strong className="text-slate-100">Como executar:</strong> rode{" "}
              <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-cyan-200">
                npm run dev
              </code>{" "}
              e abra{" "}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-cyan-200">
                /cifra-de-feistel
              </code>
              . Para usar o algoritmo, importe{" "}
              <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-cyan-200">
                encryptFeistel
              </code>{" "}
              e{" "}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-cyan-200">
                decryptFeistel
              </code>
              .
            </div>
          </section>
        ) : (
          <div className="mt-7 grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <div className="flex items-center gap-2">
                <FiKey className="text-cyan-300" />
                <h2 className="font-bold">Entrada</h2>
              </div>
              <label className="mt-5 block text-sm font-semibold text-slate-300">
                Mensagem
                <textarea
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setNotice(null);
                  }}
                  className="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>
              <label className="mt-5 block text-sm font-semibold text-slate-300">
                Senha para gerar as 16 subchaves
                <input
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setNotice(null);
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-400/10 p-3 text-sm text-violet-100">
                <FiLock className="shrink-0" />
                Blocos de 64 bits, divididos em duas metades de 32 bits.
              </div>
            </section>
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <h2 className="font-bold">Resultado</h2>
              <p className="mt-2 text-sm text-slate-400">
                Texto cifrado em hexadecimal.
              </p>
              <div className="mt-5 min-h-32 break-all rounded-xl border border-cyan-400/20 bg-slate-950 p-4 font-mono text-sm leading-7 text-cyan-100">
                {hex || "Digite uma mensagem."}
              </div>
              <button
                onClick={decrypt}
                disabled={!message}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiCheckCircle /> Decriptar resultado
              </button>
              {notice && (
                <p
                  role="status"
                  className="mt-4 rounded-xl bg-emerald-400/10 p-3 text-sm leading-6 text-emerald-200"
                >
                  {notice}
                </p>
              )}
              <div className="mt-5 border-t border-slate-800 pt-4 text-xs leading-5 text-slate-500">
                <strong className="text-slate-300">Observação:</strong> esta é
                uma implementação para estudo, sem pretensão de segurança de
                produção. Algoritmos modernos autenticados, como AES-GCM, devem
                ser usados em sistemas reais.
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default FeistelExercise;
