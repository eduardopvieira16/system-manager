import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./contexts/CategoryContext";
import { ProductProvider } from "./contexts/ProductContext";
import CategoriesPage from "./pages/CategoriesPage";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CategoryProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </CategoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
