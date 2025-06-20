import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";
import { CategoryService } from "../services/categoryService";
import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types";

interface CategoryContextData {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category | null;

  loadCategories: () => Promise<void>;
  createCategory: (category: CreateCategoryRequest) => Promise<void>;
  updateCategory: (
    id: number,
    category: UpdateCategoryRequest
  ) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  selectCategory: (category: Category | null) => void;
  getCategoryById: (id: number) => Promise<Category | null>;
}

const CategoryContext = createContext<CategoryContextData | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      toast.error("Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(
    async (category: CreateCategoryRequest) => {
      try {
        setLoading(true);
        const newCategory = await CategoryService.createCategory(category);
        setCategories((prev) => [...prev, newCategory]);
        toast.success("Categoria criada com sucesso!");
      } catch (error) {
        console.error("Erro ao criar categoria:", error);
        toast.error("Erro ao criar categoria");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateCategory = useCallback(
    async (id: number, category: UpdateCategoryRequest) => {
      try {
        setLoading(true);
        const updatedCategory = await CategoryService.updateCategory(
          id,
          category
        );
        setCategories((prev) =>
          prev.map((c) => (c.id === id ? updatedCategory : c))
        );
        if (selectedCategory?.id === id) {
          setSelectedCategory(updatedCategory);
        }
        toast.success("Categoria atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
        toast.error("Erro ao atualizar categoria");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory]
  );

  const deleteCategory = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await CategoryService.deleteCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
        if (selectedCategory?.id === id) {
          setSelectedCategory(null);
        }
        toast.success("Categoria removida com sucesso!");
      } catch (error) {
        console.error("Erro ao remover categoria:", error);
        toast.error("Erro ao remover categoria");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory]
  );

  const selectCategory = useCallback((category: Category | null) => {
    setSelectedCategory(category);
  }, []);

  const getCategoryById = useCallback(
    async (id: number): Promise<Category | null> => {
      try {
        const category = await CategoryService.getCategoryById(id);
        return category;
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        return null;
      }
    },
    []
  );

  const value: CategoryContextData = {
    categories,
    loading,
    selectedCategory,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    selectCategory,
    getCategoryById,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory deve ser usado dentro de CategoryProvider");
  }
  return context;
};
