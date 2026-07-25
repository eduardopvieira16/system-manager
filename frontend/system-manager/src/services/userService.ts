import {
  CreateUserAccountRequest,
  UpdateUserAccountRequest,
  UserAccount,
} from "../types";
import api from "./api";

export class UserService {
  static async createUser(user: CreateUserAccountRequest): Promise<UserAccount> {
    const response = await api.post<UserAccount>("/users/v1", user);
    return response.data;
  }

  static async getUsers(): Promise<UserAccount[]> {
    const response = await api.get<UserAccount[]>("/users/v1");
    return response.data;
  }

  static async getUserById(id: number): Promise<UserAccount> {
    const response = await api.get<UserAccount>(`/users/v1/${id}`);
    return response.data;
  }

  static async updateUser(
    id: number,
    user: UpdateUserAccountRequest
  ): Promise<UserAccount> {
    const response = await api.put<UserAccount>(`/users/v1/${id}`, user);
    return response.data;
  }

  static async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/v1/${id}`);
  }
}
