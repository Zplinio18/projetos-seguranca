import {
  FiBarChart2,
  FiBookOpen,
  FiSettings,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import type { PermissionId, Resource, Role, RoleId } from "./types";

export const roles: Role[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Acesso completo ao ambiente escolar.",
    initials: "AD",
    color: "bg-violet-500",
  },
  {
    id: "teacher",
    name: "Professor",
    description: "Acompanha turmas e registra avaliações.",
    initials: "PR",
    color: "bg-emerald-500",
  },
  {
    id: "student",
    name: "Aluno",
    description: "Consulta suas informações acadêmicas.",
    initials: "AL",
    color: "bg-sky-500",
  },
];

export const permissions: Record<RoleId, PermissionId[]> = {
  admin: [
    "dashboard.view",
    "students.view",
    "students.manage",
    "grades.view",
    "grades.edit",
    "settings.manage",
  ],
  teacher: ["dashboard.view", "students.view", "grades.view", "grades.edit"],
  student: ["dashboard.view", "grades.view"],
};

export const resources: Resource[] = [
  {
    id: "dashboard.view",
    title: "Painel geral",
    description: "Visualizar o resumo do sistema.",
    action: "Acessar painel",
    icon: FiBarChart2,
  },
  {
    id: "students.view",
    title: "Alunos",
    description: "Consultar a lista de estudantes.",
    action: "Ver alunos",
    icon: FiUsers,
  },
  {
    id: "students.manage",
    title: "Gestão de alunos",
    description: "Cadastrar, editar ou remover alunos.",
    action: "Gerenciar alunos",
    icon: FiUserCheck,
  },
  {
    id: "grades.view",
    title: "Notas",
    description: "Consultar boletins e avaliações.",
    action: "Ver notas",
    icon: FiBookOpen,
  },
  {
    id: "grades.edit",
    title: "Lançar notas",
    description: "Criar ou alterar avaliações de turmas.",
    action: "Lançar nota",
    icon: FiBookOpen,
  },
  {
    id: "settings.manage",
    title: "Configurações",
    description: "Administrar perfis e parâmetros da escola.",
    action: "Abrir configurações",
    icon: FiSettings,
  },
];
