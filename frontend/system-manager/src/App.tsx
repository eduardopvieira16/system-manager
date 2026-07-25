import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./contexts/CategoryContext";
import { DepartmentProvider } from "./contexts/DepartmentContext";
import { ProductProvider } from "./contexts/ProductContext";
import { UserProvider } from "./contexts/UserContext";
import CategoriesPage from "./pages/CategoriesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CategoryProvider>
        <DepartmentProvider>
          <ProductProvider>
            <UserProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<ReportsPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/departments" element={<DepartmentsPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </UserProvider>
          </ProductProvider>
        </DepartmentProvider>
      </CategoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
