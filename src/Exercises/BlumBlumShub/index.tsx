import { useState } from "react";
import { FiCode, FiDownload, FiPlay, FiShield } from "react-icons/fi";
import { blumBlumShub, n, p, q, s } from "./algorithm";

type Tab = "run" | "code";

const source = `export function blumBlumShub(amount: number): string {
  validateParameters();
  let state = (s * s) % n;
  const bits = new Array<string>(amount);

  for (let index = 0; index < amount; index += 1) {
    // x(i+1) = x(i)² mod n
    state = (state * state) % n;
    // Saída: bit menos significativo do estado
    bits[index] = (state & 1n).toString();
  }
  return bits.join("");
}`;

function BlumBlumShubExercise() {
  const [tab, setTab] = useState<Tab>("run");
  const [amount, setAmount] = useState(10000);
  const [bits, setBits] = useState("");
  const [error, setError] = useState("");

  function generate() {
    try {
      if (amount > 100000)
        throw new Error(
          "Na demonstração, use até 100.000 bits. Para 1 milhão, use npm run bbs:nist no terminal.",
        );
      setBits(blumBlumShub(amount));
      setError("");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Não foi possível gerar os bits.",
      );
    }
  }

  function download() {
    const file = new Blob([bits], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bb_bits_nist.txt";
    link.click();
    URL.revokeObjectURL(url);
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
          Exercício 07
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Blum Blum Shub + Teste NIST
        </h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Gere uma sequência pseudoaleatória com BBS e baixe os bits para
          analisar no testador da suíte NIST.
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
          <div className="mt-7 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <h2 className="font-bold">Parâmetros validados</h2>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-950 p-3">
                  <dt className="text-slate-500">p</dt>
                  <dd className="mt-1 font-mono font-bold text-cyan-300">
                    {p.toString()}
                  </dd>
                </div>
                <div className="rounded-xl bg-slate-950 p-3">
                  <dt className="text-slate-500">q</dt>
                  <dd className="mt-1 font-mono font-bold text-cyan-300">
                    {q.toString()}
                  </dd>
                </div>
                <div className="rounded-xl bg-slate-950 p-3">
                  <dt className="text-slate-500">s</dt>
                  <dd className="mt-1 font-mono font-bold text-cyan-300">
                    {s.toString()}
                  </dd>
                </div>
                <div className="rounded-xl bg-slate-950 p-3">
                  <dt className="text-slate-500">n = p × q</dt>
                  <dd className="mt-1 font-mono font-bold text-cyan-300">
                    {n.toString()}
                  </dd>
                </div>
              </dl>
              <label className="mt-6 block text-sm font-semibold text-slate-300">
                Quantidade de bits (máx. 100.000)
                <input
                  type="number"
                  min="1"
                  max="100000"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 outline-none focus:border-cyan-300"
                />
              </label>
              <button
                onClick={generate}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                <FiPlay /> Gerar bits
              </button>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Para 1.000.000 de bits, prefira o terminal:{" "}
                <code>npm run bbs:nist</code>.
              </p>
            </section>
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold">Sequência gerada</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    A prévia mostra somente os primeiros 1.024 bits.
                  </p>
                </div>
                {bits && (
                  <button
                    onClick={download}
                    className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-bold hover:bg-slate-800"
                  >
                    <FiDownload /> Baixar
                  </button>
                )}
              </div>
              {error && (
                <p className="mt-5 rounded-xl bg-rose-400/10 p-3 text-sm text-rose-200">
                  {error}
                </p>
              )}
              {bits ? (
                <>
                  <pre className="mt-5 min-h-48 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-slate-950 p-4 font-mono text-xs leading-6 text-cyan-100">
                    {bits.slice(0, 1024)}
                    {bits.length > 1024 ? "…" : ""}
                  </pre>
                  <p className="mt-3 text-sm text-emerald-300">
                    {bits.length.toLocaleString("pt-BR")} bits gerados.
                  </p>
                </>
              ) : (
                <p className="grid min-h-48 place-items-center rounded-xl bg-slate-950 text-sm text-slate-500">
                  Clique em “Gerar bits”.
                </p>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default BlumBlumShubExercise;
