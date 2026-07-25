import {
  CreateDepartmentRequest,
  Department,
  UpdateDepartmentRequest,
} from "../types";
import api from "./api";

export class DepartmentService {
  static async createDepartment(
    department: CreateDepartmentRequest
  ): Promise<Department> {
    const response = await api.post<Department>(
      "/departments/v1",
      department
    );
    return response.data;
  }

  static async getDepartments(): Promise<Department[]> {
    const response = await api.get<Department[]>("/departments/v1");
    return response.data;
  }

  static async getDepartmentById(id: number): Promise<Department> {
    const response = await api.get<Department>(`/departments/v1/${id}`);
    return response.data;
  }

  static async updateDepartment(
    id: number,
    department: UpdateDepartmentRequest
  ): Promise<Department> {
    const response = await api.put<Department>(
      `/departments/v1/${id}`,
      department
    );
    return response.data;
  }

  static async deleteDepartment(id: number): Promise<void> {
    await api.delete(`/departments/v1/${id}`);
  }
}
