import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useCategory } from "../../contexts/CategoryContext";
import { ProductFilters as FilterTypes } from "../../types";

interface ProductFiltersProps {
  onFilterChange: (filters: FilterTypes) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  onClearFilters,
}) => {
  const { categories, loadCategories } = useCategory();
  const [filters, setFilters] = useState<FilterTypes>({});

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleFilterChange = (
    field: keyof FilterTypes,
    value: string | number | undefined
  ) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onClearFilters();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="name">Nome do Produto</Label>
          <Input
            id="name"
            placeholder="Digite o nome..."
            value={filters.name || ""}
            onChange={(e) =>
              handleFilterChange("name", e.target.value || undefined)
            }
          />
        </div>

        <div>
          <Label htmlFor="categoryId">Categoria</Label>
          <Select
            value={filters.categoryId?.toString() || ""}
            onValueChange={(value) =>
              handleFilterChange(
                "categoryId",
                value && value !== "all" ? parseInt(value, 10) : undefined
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>

      <div className="mt-4">
        <Button variant="outline" onClick={handleClearFilters}>
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
