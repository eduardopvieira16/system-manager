import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {
  CreateUserAccountRequest,
  Department,
  UpdateUserAccountRequest,
  UserAccount,
  UserRole,
  UserStatus,
} from "../../types";
import LoadingSpinner from "../Common/LoadingSpinner";

const roles: { label: string; value: UserRole }[] = [
  { label: "Administrador", value: "ADMIN" },
  { label: "Gestor", value: "MANAGER" },
  { label: "Operador", value: "OPERATOR" },
];

const statuses: { label: string; value: UserStatus }[] = [
  { label: "Ativo", value: "ACTIVE" },
  { label: "Inativo", value: "INACTIVE" },
  { label: "Em licença", value: "ON_LEAVE" },
];

interface UserFormProps {
  user?: UserAccount;
  departments: Department[];
  onSubmit: (
    data: CreateUserAccountRequest | UpdateUserAccountRequest
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  departments,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "OPERATOR",
    status: user?.status || "ACTIVE",
    departmentId: user?.departmentId?.toString() || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      role: formData.role as UserRole,
      status: formData.status as UserStatus,
      departmentId: formData.departmentId
        ? Number(formData.departmentId)
        : undefined,
    };

    await onSubmit(data);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        {user ? "Editar Usuário" : "Novo Usuário"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Perfil *</Label>
            <select
              id="role"
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              disabled={loading}
              required
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="status">Status *</Label>
            <select
              id="status"
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              disabled={loading}
              required
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="department">Departamento</Label>
          <select
            id="department"
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={formData.departmentId}
            onChange={(e) => handleChange("departmentId", e.target.value)}
            disabled={loading}
          >
            <option value="">Sem departamento</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                {user ? "Atualizando..." : "Criando..."}
              </>
            ) : user ? (
              "Atualizar"
            ) : (
              "Criar"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
