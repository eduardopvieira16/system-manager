export interface Product {
  categoryId: number;
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
}

export interface ProductFilters {
  name?: string;
  categoryId?: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
