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
    <main className="min-h-screen bg-[#f5f7fb] font-sans text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-cyan-300">
              <FiShield size={21} />
            </div>
            <div>
              <p className="text-lg font-bold leading-5 text-slate-900">
                Escola Horizonte
              </p>
              <p className="text-xs font-medium text-slate-500">
                Ambiente administrativo
              </p>
            </div>
          </div>
          <span className="hidden rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 sm:block">
            Demonstração RBAC
          </span>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-cyan-700">
            Controle de acesso
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            RBAC do sistema escolar
          </h1>
          <p className="mt-3 text-slate-600">
            Troque o perfil ativo para simular quais recursos ficam disponíveis
            para cada função.
          </p>
        </div>
        <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Perfil em simulação
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white ${currentRole.color}`}
                >
                  {currentRole.initials}
                </span>
                <div>
                  <p className="font-bold text-slate-900">{currentRole.name}</p>
                  <p className="text-sm text-slate-500">
                    {currentRole.description}
                  </p>
                </div>
              </div>
            </div>
            <label className="relative block md:w-64">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Alterar perfil
              </span>
              <select
                value={activeRole}
                onChange={(event) => {
                  setActiveRole(event.target.value as RoleId);
                  setFeedback(null);
                }}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 font-semibold text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute bottom-3.5 right-3 text-slate-500" />
            </label>
          </div>
        </section>
        {feedback && (
          <div
            role="status"
            className={`mb-7 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${feedback.startsWith("Acesso permitido") ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white">
              {feedback.startsWith("Acesso permitido") ? <FiCheck /> : <FiX />}
            </span>
            {feedback}
          </div>
        )}
        <div className="grid gap-7 xl:grid-cols-[1.45fr_0.95fr]">
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recursos do sistema
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Os botões validam a permissão do perfil selecionado.
                </p>
              </div>
              <span className="rounded-lg bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600">
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
                    className={`rounded-2xl border bg-white p-5 shadow-sm transition ${allowed ? "border-slate-200" : "border-slate-200 opacity-70"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-xl ${allowed ? "bg-cyan-50 text-cyan-700" : "bg-slate-100 text-slate-400"}`}
                      >
                        <Icon size={20} />
                      </span>
                      {allowed ? (
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                          <FiCheck /> Permitido
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">
                          <FiLock /> Restrito
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-bold text-slate-900">
                      {resource.title}
                    </h3>
                    <p className="mt-1 min-h-10 text-sm text-slate-500">
                      {resource.description}
                    </p>
                    <button
                      onClick={() => tryAction(resource.id, resource.action)}
                      className={`mt-4 w-full rounded-xl px-3 py-2.5 text-sm font-bold transition ${allowed ? "bg-slate-900 text-white hover:bg-slate-700" : "cursor-not-allowed bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                    >
                      {resource.action}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700">
                <FiShield size={20} />
              </span>
              <div>
                <h2 className="font-bold text-slate-900">
                  Matriz de permissões
                </h2>
                <p className="text-sm text-slate-500">
                  Regra definida por função.
                </p>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
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
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-3 font-medium text-slate-700">
                        {resource.title}
                      </td>
                      {roles.map((role) => (
                        <td key={role.id} className="py-3 text-center">
                          {permissions[role.id].includes(resource.id) ? (
                            <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                              <FiCheck size={14} />
                            </span>
                          ) : (
                            <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-slate-400">
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
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <strong className="text-slate-800">Como funciona:</strong> cada
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
