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

export interface Department {
  id: number;
  name: string;
  description?: string;
  active: boolean;
}

export interface CreateDepartmentRequest {
  name: string;
  description?: string;
  active: boolean;
}

export interface UpdateDepartmentRequest {
  name?: string;
  description?: string;
  active?: boolean;
}

export type UserRole = "ADMIN" | "MANAGER" | "OPERATOR";
export type UserStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE";

export interface UserAccount {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  departmentId?: number;
  departmentName?: string;
}

export interface CreateUserAccountRequest {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  departmentId?: number;
}

export interface UpdateUserAccountRequest {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  departmentId?: number;
}

export interface ReportSummary {
  totalProducts: number;
  totalCategories: number;
  totalDepartments: number;
  totalUsers: number;
}
