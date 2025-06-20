import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import CategoryForm from "../components/Categories/CategoryForm";
import CategoryList from "../components/Categories/CategoryList";
import Layout from "../components/Layout/Layout";
import { useCategory } from "../contexts/CategoryContext";
import { Category } from "../types";

const CategoriesPage: React.FC = () => {
  const {
    categories,
    loading,
    selectedCategory,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    selectCategory,
  } = useCategory();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCreateCategory = async (data: any) => {
    await createCategory(data);
    setShowForm(false);
  };

  const handleUpdateCategory = async (data: any) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory.id, data);
      setShowForm(false);
      selectCategory(null);
    }
  };

  const handleEditCategory = (category: Category) => {
    selectCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      await deleteCategory(id);
    }
  };

  const handleViewCategory = (category: Category) => {
    console.log("Visualizar categoria:", category);
  };

  const handleNewCategory = () => {
    selectCategory(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    selectCategory(null);
  };

  if (showForm) {
    return (
      <Layout>
        <CategoryForm
          category={selectedCategory || undefined}
          onSubmit={
            selectedCategory ? handleUpdateCategory : handleCreateCategory
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
          <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
          <Button onClick={handleNewCategory}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Categoria
          </Button>
        </div>

        <CategoryList
          categories={categories}
          loading={loading}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onView={handleViewCategory}
        />
      </div>
    </Layout>
  );
};

export default CategoriesPage;
