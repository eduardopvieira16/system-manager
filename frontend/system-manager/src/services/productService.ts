import {
  CreateProductRequest,
  Product,
  ProductFilters,
  UpdateProductRequest,
} from "../types";
import api from "./api";

export class ProductService {
  static async createProduct(product: CreateProductRequest): Promise<Product> {
    const response = await api.post<Product>("/products/v1", product);
    return response.data;
  }

  static async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();

    if (filters?.name) params.append("name", filters.name);
    if (filters?.categoryId)
      params.append("categoryId", filters.categoryId.toString());

    const response = await api.get<Product[]>("/products/v1", { params });
    return response.data;
  }

  static async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/v1/${id}`);
    return response.data;
  }

  static async updateProduct(
    id: number,
    product: UpdateProductRequest
  ): Promise<Product> {
    const response = await api.put<Product>(`/products/v1/${id}`, product);
    return response.data;
  }

  static async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/v1/${id}`);
  }
}
