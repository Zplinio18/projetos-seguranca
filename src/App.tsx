import RbacExercise from "./Exercises/RBAC";

function App() {
  const path = window.location.pathname.toLowerCase();

  if (path === "/rbac" || path === "/rbac/") return <RbacExercise />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
      <section className="max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
          Exercícios de segurança
        </p>
        <h1 className="text-2xl font-bold">Selecione um exercício</h1>
        <a
          href="/RBAC"
          className="mt-6 inline-flex rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Abrir RBAC escolar
        </a>
      </section>
    </main>
  );
}

export default App;
