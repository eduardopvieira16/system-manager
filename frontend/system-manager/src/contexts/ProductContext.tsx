import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";
import { ProductService } from "../services/productService";
import {
  CreateProductRequest,
  Product,
  ProductFilters,
  UpdateProductRequest,
} from "../types";

interface ProductContextData {
  products: Product[];
  loading: boolean;
  selectedProduct: Product | null;

  loadProducts: (filters?: ProductFilters) => Promise<void>;
  createProduct: (product: CreateProductRequest) => Promise<void>;
  updateProduct: (id: number, product: UpdateProductRequest) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  selectProduct: (product: Product | null) => void;
  getProductById: (id: number) => Promise<Product | null>;
}

const ProductContext = createContext<ProductContextData | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = useCallback(async (filters?: ProductFilters) => {
    try {
      setLoading(true);
      const data = await ProductService.getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (product: CreateProductRequest) => {
    try {
      setLoading(true);
      const newProduct = await ProductService.createProduct(product);
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(
    async (id: number, product: UpdateProductRequest) => {
      try {
        setLoading(true);
        const updatedProduct = await ProductService.updateProduct(id, product);
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updatedProduct : p))
        );
        if (selectedProduct?.id === id) {
          setSelectedProduct(updatedProduct);
        }
        toast.success("Produto atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        toast.error("Erro ao atualizar produto");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedProduct]
  );

  const deleteProduct = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await ProductService.deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        if (selectedProduct?.id === id) {
          setSelectedProduct(null);
        }
        toast.success("Produto removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover produto:", error);
        toast.error("Erro ao remover produto");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedProduct]
  );

  const selectProduct = useCallback((product: Product | null) => {
    setSelectedProduct(product);
  }, []);

  const getProductById = useCallback(
    async (id: number): Promise<Product | null> => {
      try {
        const product = await ProductService.getProductById(id);
        return product;
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        return null;
      }
    },
    []
  );

  const value: ProductContextData = {
    products,
    loading,
    selectedProduct,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    selectProduct,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct deve ser usado dentro de ProductProvider");
  }
  return context;
};
