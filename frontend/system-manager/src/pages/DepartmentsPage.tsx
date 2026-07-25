import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import DepartmentForm from "../components/Departments/DepartmentForm";
import DepartmentList from "../components/Departments/DepartmentList";
import Layout from "../components/Layout/Layout";
import { useDepartment } from "../contexts/DepartmentContext";
import { Department } from "../types";

const DepartmentsPage: React.FC = () => {
  const {
    departments,
    loading,
    selectedDepartment,
    loadDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    selectDepartment,
  } = useDepartment();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  const handleCreateDepartment = async (data: any) => {
    await createDepartment(data);
    setShowForm(false);
  };

  const handleUpdateDepartment = async (data: any) => {
    if (selectedDepartment) {
      await updateDepartment(selectedDepartment.id, data);
      setShowForm(false);
      selectDepartment(null);
    }
  };

  const handleEditDepartment = (department: Department) => {
    selectDepartment(department);
    setShowForm(true);
  };

  const handleDeleteDepartment = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este departamento?")) {
      await deleteDepartment(id);
    }
  };

  const handleNewDepartment = () => {
    selectDepartment(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    selectDepartment(null);
  };

  if (showForm) {
    return (
      <Layout>
        <DepartmentForm
          department={selectedDepartment || undefined}
          onSubmit={
            selectedDepartment ? handleUpdateDepartment : handleCreateDepartment
          }
          onCancel={handleCancelForm}
          loading={loading}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Departamentos</h1>
          <Button onClick={handleNewDepartment}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Departamento
          </Button>
        </div>

        <DepartmentList
          departments={departments}
          loading={loading}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteDepartment}
        />
      </div>
    </Layout>
  );
};

export default DepartmentsPage;
