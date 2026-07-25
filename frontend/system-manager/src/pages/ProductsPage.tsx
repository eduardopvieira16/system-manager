import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductFilters from "../components/Products/ProductFilters";
import ProductForm from "../components/Products/ProductForm";
import ProductList from "../components/Products/ProductList";
import { useProduct } from "../contexts/ProductContext";
import { Product, ProductFilters as ProductFiltersType } from "../types";

const ProductsPage: React.FC = () => {
  const {
    products,
    loading,
    selectedProduct,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    selectProduct,
  } = useProduct();

  const [showForm, setShowForm] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<ProductFiltersType>({});

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCreateProduct = async (data: any) => {
    await createProduct(data);
    setShowForm(false);
  };

  const handleUpdateProduct = async (data: any) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, data);
      setShowForm(false);
      selectProduct(null);
    }
  };

  const handleEditProduct = (product: Product) => {
    selectProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteProduct(id);
    }
  };

  const handleViewProduct = (product: Product) => {
    console.log("Visualizar produto:", product);
  };

  const handleFilterChange = (filters: ProductFiltersType) => {
    setCurrentFilters(filters);
    loadProducts(filters);
  };

  const handleClearFilters = () => {
    setCurrentFilters({});
    loadProducts();
  };

  const handleNewProduct = () => {
    selectProduct(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    selectProduct(null);
  };

  if (showForm) {
    return (
      <Layout>
        <ProductForm
          product={selectedProduct || undefined}
          onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
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
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <Button onClick={handleNewProduct}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        <ProductFilters
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <ProductList
          products={products}
          loading={loading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
        />
      </div>
    </Layout>
  );
};

export default ProductsPage;
