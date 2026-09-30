import RbacExercise from "./Exercises/RBAC";
import CaesarExercise from "./Exercises/CifraDeCesar";
import FeistelExercise from "./Exercises/CifraDeFeistel";

function App() {
  const path = window.location.pathname.toLowerCase();

  if (path === "/rbac" || path === "/rbac/") return <RbacExercise />;
  if (path === "/cifra-de-cesar" || path === "/cifra-de-cesar/") {
    return <CaesarExercise />;
  }
  if (path === "/cifra-de-feistel" || path === "/cifra-de-feistel/") {
    return <FeistelExercise />;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100 sm:p-10">
      <section className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
          DCC-075
        </p>
        <h1 className="text-3xl font-bold">Exercícios de Segurança</h1>
        <p className="mt-2 text-slate-400">
          Selecione um exercício para abrir a demonstração.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead className="bg-slate-800/70 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-4">Exercício</th>
                  <th className="px-5 py-4">Tema</th>
                  <th className="px-5 py-4">Descrição</th>
                  <th className="px-5 py-4 text-right">Acesso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="transition hover:bg-slate-800/40">
                  <td className="px-5 py-5 font-mono font-bold text-cyan-300">
                    01
                  </td>
                  <td className="px-5 py-5 font-semibold">RBAC</td>
                  <td className="px-5 py-5 text-sm text-slate-400">
                    Controle de acesso por papéis em um sistema escolar.
                  </td>
                  <td className="px-5 py-5 text-right">
                    <a
                      href="/RBAC"
                      className="inline-flex rounded-lg bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Abrir
                    </a>
                  </td>
                </tr>
                <tr className="transition hover:bg-slate-800/40">
                  <td className="px-5 py-5 font-mono font-bold text-cyan-300">
                    03
                  </td>
                  <td className="px-5 py-5 font-semibold">Cifra de César</td>
                  <td className="px-5 py-5 text-sm text-slate-400">
                    Cifragem por deslocamento e análise de frequência de letras.
                  </td>
                  <td className="px-5 py-5 text-right">
                    <a
                      href="/cifra-de-cesar"
                      className="inline-flex rounded-lg bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Abrir
                    </a>
                  </td>
                </tr>
                <tr className="transition hover:bg-slate-800/40">
                  <td className="px-5 py-5 font-mono font-bold text-cyan-300">
                    04
                  </td>
                  <td className="px-5 py-5 font-semibold">Cifra de Feistel</td>
                  <td className="px-5 py-5 text-sm text-slate-400">
                    Encriptação e decriptação com 16 rodadas e XOR.
                  </td>
                  <td className="px-5 py-5 text-right">
                    <a
                      href="/cifra-de-feistel"
                      className="inline-flex rounded-lg bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Abrir
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
