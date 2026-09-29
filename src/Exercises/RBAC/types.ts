import type { IconType } from "react-icons";

export type RoleId = "admin" | "teacher" | "student";
export type PermissionId =
  | "dashboard.view"
  | "students.view"
  | "students.manage"
  | "grades.view"
  | "grades.edit"
  | "settings.manage";

export interface Role {
  id: RoleId;
  name: string;
  description: string;
  initials: string;
  color: string;
}
export interface Resource {
  id: PermissionId;
  title: string;
  description: string;
  action: string;
  icon: IconType;
}
