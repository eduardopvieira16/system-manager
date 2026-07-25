import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import {
  CreateDepartmentRequest,
  Department,
  UpdateDepartmentRequest,
} from "../../types";
import LoadingSpinner from "../Common/LoadingSpinner";

interface DepartmentFormProps {
  department?: Department;
  onSubmit: (
    data: CreateDepartmentRequest | UpdateDepartmentRequest
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  department,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: department?.name || "",
    description: department?.description || "",
    active: department?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      description: formData.description,
      active: formData.active,
    };

    await onSubmit(data);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        {department ? "Editar Departamento" : "Novo Departamento"}
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
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="active"
            type="checkbox"
            className="h-4 w-4"
            checked={formData.active}
            onChange={(e) => handleChange("active", e.target.checked)}
            disabled={loading}
          />
          <Label htmlFor="active">Departamento ativo</Label>
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                {department ? "Atualizando..." : "Criando..."}
              </>
            ) : department ? (
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

export default DepartmentForm;
