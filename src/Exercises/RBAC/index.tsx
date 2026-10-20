import { useState } from "react";
import { FiCheck, FiChevronDown, FiLock, FiShield, FiX } from "react-icons/fi";
import { permissions, resources, roles } from "./data";
import type { PermissionId, RoleId } from "./types";

function RbacExercise() {
  const [activeRole, setActiveRole] = useState<RoleId>("teacher");
  const [feedback, setFeedback] = useState<string | null>(null);
  const currentRole = roles.find((role) => role.id === activeRole)!;
  const can = (permission: PermissionId) =>
    permissions[activeRole].includes(permission);
  const tryAction = (permission: PermissionId, action: string) =>
    setFeedback(
      can(permission)
        ? `Acesso permitido: ${action}.`
        : `Acesso negado: o perfil ${currentRole.name} não possui esta permissão.`,
    );

  return (
    <main className="min-h-screen bg-slate-950 font-sans text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-cyan-300">
              <FiShield size={21} />
            </div>
            <div>
              <p className="text-lg font-bold leading-5 text-white">
                Escola Horizonte
              </p>
              <p className="text-xs font-medium text-slate-400">
                Ambiente administrativo
              </p>
            </div>
          </div>
          <span className="hidden rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 sm:block">
            Demonstração RBAC
          </span>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
            Controle de acesso
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            RBAC do sistema escolar
          </h1>
          <p className="mt-3 text-slate-400">
            Troque o perfil ativo para simular quais recursos ficam disponíveis
            para cada função.
          </p>
        </div>
        <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-400">
                Perfil em simulação
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white ${currentRole.color}`}
                >
                  {currentRole.initials}
                </span>
                <div>
                  <p className="font-bold text-white">{currentRole.name}</p>
                  <p className="text-sm text-slate-400">
                    {currentRole.description}
                  </p>
                </div>
              </div>
            </div>
            <label className="relative block md:w-64">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Alterar perfil
              </span>
              <select
                value={activeRole}
                onChange={(event) => {
                  setActiveRole(event.target.value as RoleId);
                  setFeedback(null);
                }}
                className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-10 font-semibold text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute bottom-3.5 right-3 text-slate-400" />
            </label>
          </div>
        </section>
        {feedback && (
          <div
            role="status"
            className={`mb-7 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${feedback.startsWith("Acesso permitido") ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-rose-400/30 bg-rose-400/10 text-rose-200"}`}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-950">
              {feedback.startsWith("Acesso permitido") ? <FiCheck /> : <FiX />}
            </span>
            {feedback}
          </div>
        )}
        <div className="grid gap-7 xl:grid-cols-[1.45fr_0.95fr]">
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Recursos do sistema
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Os botões validam a permissão do perfil selecionado.
                </p>
              </div>
              <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300">
                {permissions[activeRole].length} de {resources.length} liberados
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {resources.map((resource) => {
                const allowed = can(resource.id);
                const Icon = resource.icon;
                return (
                  <article
                    key={resource.id}
                    className={`rounded-2xl border bg-slate-900 p-5 shadow-xl transition ${allowed ? "border-slate-800" : "border-slate-800 opacity-70"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-xl ${allowed ? "bg-cyan-400/10 text-cyan-300" : "bg-slate-800 text-slate-500"}`}
                      >
                        <Icon size={20} />
                      </span>
                      {allowed ? (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300">
                          <FiCheck /> Permitido
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1 text-xs font-bold text-slate-400">
                          <FiLock /> Restrito
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-bold text-white">
                      {resource.title}
                    </h3>
                    <p className="mt-1 min-h-10 text-sm text-slate-400">
                      {resource.description}
                    </p>
                    <button
                      onClick={() => tryAction(resource.id, resource.action)}
                      className={`mt-4 w-full rounded-xl px-3 py-2.5 text-sm font-bold transition ${allowed ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300" : "cursor-not-allowed bg-slate-800 text-slate-500 hover:bg-slate-800"}`}
                    >
                      {resource.action}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                <FiShield size={20} />
              </span>
              <div>
                <h2 className="font-bold text-white">Matriz de permissões</h2>
                <p className="text-sm text-slate-400">
                  Regra definida por função.
                </p>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
                    <th className="pb-3 font-bold">Recurso</th>
                    {roles.map((role) => (
                      <th key={role.id} className="pb-3 text-center font-bold">
                        {role.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource) => (
                    <tr
                      key={resource.id}
                      className="border-b border-slate-800 last:border-0"
                    >
                      <td className="py-3 font-medium text-slate-300">
                        {resource.title}
                      </td>
                      {roles.map((role) => (
                        <td key={role.id} className="py-3 text-center">
                          {permissions[role.id].includes(resource.id) ? (
                            <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                              <FiCheck size={14} />
                            </span>
                          ) : (
                            <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-slate-800 text-slate-500">
                              <FiX size={14} />
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 rounded-xl bg-slate-800 p-4 text-sm leading-6 text-slate-300">
              <strong className="text-white">Como funciona:</strong> cada
              usuário recebe uma função. A função determina suas permissões, e
              cada ação verifica se a permissão necessária está disponível.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default RbacExercise;
