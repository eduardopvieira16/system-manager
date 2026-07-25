import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import UserForm from "../components/Users/UserForm";
import UserList from "../components/Users/UserList";
import { useDepartment } from "../contexts/DepartmentContext";
import { useUser } from "../contexts/UserContext";
import { UserAccount } from "../types";

const UsersPage: React.FC = () => {
  const {
    users,
    loading,
    selectedUser,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    selectUser,
  } = useUser();
  const { departments, loadDepartments } = useDepartment();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadUsers();
    loadDepartments();
  }, [loadUsers, loadDepartments]);

  const handleCreateUser = async (data: any) => {
    await createUser(data);
    setShowForm(false);
  };

  const handleUpdateUser = async (data: any) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, data);
      setShowForm(false);
      selectUser(null);
    }
  };

  const handleEditUser = (user: UserAccount) => {
    selectUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      await deleteUser(id);
    }
  };

  const handleNewUser = () => {
    selectUser(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    selectUser(null);
  };

  if (showForm) {
    return (
      <Layout>
        <UserForm
          user={selectedUser || undefined}
          departments={departments}
          onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
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
          <h1 className="text-2xl font-bold text-gray-900">Usuários</h1>
          <Button onClick={handleNewUser}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>

        <UserList
          users={users}
          loading={loading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </Layout>
  );
};

export default UsersPage;
