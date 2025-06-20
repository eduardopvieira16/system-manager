import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              System Manager
            </Link>
          </div>

          <nav className="flex space-x-8">
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/products")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              Produtos
            </Link>
            <Link
              to="/categories"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/categories")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              Categorias
            </Link>

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
