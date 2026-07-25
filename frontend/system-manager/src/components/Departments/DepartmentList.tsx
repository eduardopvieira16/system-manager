import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Department } from "../../types";
import LoadingSpinner from "../Common/LoadingSpinner";

interface DepartmentListProps {
  departments: Department[];
  loading?: boolean;
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({
  departments,
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <LoadingSpinner size="lg" className="py-8" />;
  }

  if (departments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum departamento encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {departments.map((department) => (
        <Card key={department.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>{department.name}</span>
              <Badge variant={department.active ? "default" : "secondary"}>
                {department.active ? "Ativo" : "Inativo"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {department.description ? (
              <p className="text-sm text-gray-600">
                {department.description}
              </p>
            ) : (
              <p className="text-sm text-gray-400">Sem descrição.</p>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(department)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(department.id)}
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

export default DepartmentList;
