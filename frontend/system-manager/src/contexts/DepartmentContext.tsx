import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";
import { DepartmentService } from "../services/departmentService";
import {
  CreateDepartmentRequest,
  Department,
  UpdateDepartmentRequest,
} from "../types";

interface DepartmentContextData {
  departments: Department[];
  loading: boolean;
  selectedDepartment: Department | null;

  loadDepartments: () => Promise<void>;
  createDepartment: (department: CreateDepartmentRequest) => Promise<void>;
  updateDepartment: (id: number, department: UpdateDepartmentRequest) => Promise<void>;
  deleteDepartment: (id: number) => Promise<void>;
  selectDepartment: (department: Department | null) => void;
  getDepartmentById: (id: number) => Promise<Department | null>;
}

const DepartmentContext = createContext<DepartmentContextData | undefined>(
  undefined
);

export const DepartmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const loadDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DepartmentService.getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Erro ao carregar departamentos:", error);
      toast.error("Erro ao carregar departamentos");
    } finally {
      setLoading(false);
    }
  }, []);

  const createDepartment = useCallback(
    async (department: CreateDepartmentRequest) => {
      try {
        setLoading(true);
        const newDepartment =
          await DepartmentService.createDepartment(department);
        setDepartments((prev) => [...prev, newDepartment]);
        toast.success("Departamento criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar departamento:", error);
        toast.error("Erro ao criar departamento");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateDepartment = useCallback(
    async (id: number, department: UpdateDepartmentRequest) => {
      try {
        setLoading(true);
        const updated = await DepartmentService.updateDepartment(
          id,
          department
        );
        setDepartments((prev) =>
          prev.map((dept) => (dept.id === id ? updated : dept))
        );
        if (selectedDepartment?.id === id) {
          setSelectedDepartment(updated);
        }
        toast.success("Departamento atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar departamento:", error);
        toast.error("Erro ao atualizar departamento");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedDepartment]
  );

  const deleteDepartment = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await DepartmentService.deleteDepartment(id);
        setDepartments((prev) => prev.filter((dept) => dept.id !== id));
        if (selectedDepartment?.id === id) {
          setSelectedDepartment(null);
        }
        toast.success("Departamento removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover departamento:", error);
        toast.error("Erro ao remover departamento");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedDepartment]
  );

  const selectDepartment = useCallback((department: Department | null) => {
    setSelectedDepartment(department);
  }, []);

  const getDepartmentById = useCallback(
    async (id: number): Promise<Department | null> => {
      try {
        const department = await DepartmentService.getDepartmentById(id);
        return department;
      } catch (error) {
        console.error("Erro ao buscar departamento:", error);
        return null;
      }
    },
    []
  );

  const value: DepartmentContextData = {
    departments,
    loading,
    selectedDepartment,
    loadDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    selectDepartment,
    getDepartmentById,
  };

  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartment = () => {
  const context = useContext(DepartmentContext);
  if (context === undefined) {
    throw new Error("useDepartment deve ser usado dentro de DepartmentProvider");
  }
  return context;
};
