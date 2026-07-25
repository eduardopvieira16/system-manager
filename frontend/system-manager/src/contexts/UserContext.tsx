import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";
import { UserService } from "../services/userService";
import {
  CreateUserAccountRequest,
  UpdateUserAccountRequest,
  UserAccount,
} from "../types";

interface UserContextData {
  users: UserAccount[];
  loading: boolean;
  selectedUser: UserAccount | null;

  loadUsers: () => Promise<void>;
  createUser: (user: CreateUserAccountRequest) => Promise<void>;
  updateUser: (id: number, user: UpdateUserAccountRequest) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  selectUser: (user: UserAccount | null) => void;
  getUserById: (id: number) => Promise<UserAccount | null>;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await UserService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (user: CreateUserAccountRequest) => {
    try {
      setLoading(true);
      const newUser = await UserService.createUser(user);
      setUsers((prev) => [...prev, newUser]);
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast.error("Erro ao criar usuário");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(
    async (id: number, user: UpdateUserAccountRequest) => {
      try {
        setLoading(true);
        const updated = await UserService.updateUser(id, user);
        setUsers((prev) => prev.map((item) => (item.id === id ? updated : item)));
        if (selectedUser?.id === id) {
          setSelectedUser(updated);
        }
        toast.success("Usuário atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        toast.error("Erro ao atualizar usuário");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedUser]
  );

  const deleteUser = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await UserService.deleteUser(id);
        setUsers((prev) => prev.filter((item) => item.id !== id));
        if (selectedUser?.id === id) {
          setSelectedUser(null);
        }
        toast.success("Usuário removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover usuário:", error);
        toast.error("Erro ao remover usuário");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedUser]
  );

  const selectUser = useCallback((user: UserAccount | null) => {
    setSelectedUser(user);
  }, []);

  const getUserById = useCallback(
    async (id: number): Promise<UserAccount | null> => {
      try {
        return await UserService.getUserById(id);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null;
      }
    },
    []
  );

  const value: UserContextData = {
    users,
    loading,
    selectedUser,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    selectUser,
    getUserById,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de UserProvider");
  }
  return context;
};
