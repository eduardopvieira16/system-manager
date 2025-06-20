import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types";
import api from "./api";

export class CategoryService {
  static async createCategory(
    category: CreateCategoryRequest
  ): Promise<Category> {
    const response = await api.post<Category>("/categories/v1", category);
    return response.data;
  }

  static async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>("/categories/v1");
    return response.data;
  }

  static async getCategoryById(id: number): Promise<Category> {
    const response = await api.get<Category>(`/categories/v1/${id}`);
    return response.data;
  }

  static async updateCategory(
    id: number,
    category: UpdateCategoryRequest
  ): Promise<Category> {
    const response = await api.put<Category>(`/categories/v1/${id}`, category);
    return response.data;
  }

  static async deleteCategory(id: number): Promise<void> {
    await api.delete(`/categories/v1/${id}`);
  }
}
