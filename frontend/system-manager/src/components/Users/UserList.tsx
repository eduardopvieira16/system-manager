import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { UserAccount } from "../../types";
import LoadingSpinner from "../Common/LoadingSpinner";

const roleLabels: Record<string, string> = {
  ADMIN: "Administrador",
  MANAGER: "Gestor",
  OPERATOR: "Operador",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
  ON_LEAVE: "Em licença",
};

interface UserListProps {
  users: UserAccount[];
  loading?: boolean;
  onEdit: (user: UserAccount) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <LoadingSpinner size="lg" className="py-8" />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum usuário encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {users.map((user) => (
        <Card key={user.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>{user.name}</span>
              <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"}>
                {statusLabels[user.status] ?? user.status}
              </Badge>
            </CardTitle>
            <p className="text-sm text-gray-500">{user.email}</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span>Perfil: {roleLabels[user.role] ?? user.role}</span>
              {user.departmentName && (
                <span>• Departamento: {user.departmentName}</span>
              )}
              {user.phone && <span>• Telefone: {user.phone}</span>}
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(user)}>
                Editar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(user.id)}
              >
                Excluir
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
