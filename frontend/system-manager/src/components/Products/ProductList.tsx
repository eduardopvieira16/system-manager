import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Product } from "../../types";
import LoadingSpinner from "../Common/LoadingSpinner";

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onView: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading = false,
  onEdit,
  onDelete,
  onView,
}) => {
  if (loading) {
    return <LoadingSpinner size="lg" className="py-8" />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {product.description && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="flex justify-between">
                <span className="font-semibold text-green-600">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(product)}
              >
                Editar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(product.id)}
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

export default ProductList;
