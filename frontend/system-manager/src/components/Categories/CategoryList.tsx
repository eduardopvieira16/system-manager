import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Category } from "../../types";
import LoadingSpinner from "../Common/LoadingSpinner";

interface CategoryListProps {
  categories: Category[];
  loading?: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  onView: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  loading = false,
  onEdit,
  onDelete,
  onView,
}) => {
  if (loading) {
    return <LoadingSpinner size="lg" className="py-8" />;
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma categoria encontrada.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </CardHeader>
          <CardContent>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(category)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(category.id)}
              >
                Excluir
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoryList;
