import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CategoryForm from "../components/category/CategoryForm";
import CategoryList from "../components/category/CategoryList";

import { getCategories } from "../services/categoryService";
import type { Category } from "../services/categoryService";

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container">
      <h1>Categories Management</h1>

      <div className="page-layout">
        <aside className="sidebar">
          <CategoryForm onCategorySaved={loadCategories} />
        </aside>

        <main className="main-content">
          {loading ? (
            <div className="loading">Loading categories...</div>
          ) : (
            <CategoryList
              categories={categories}
              onDelete={loadCategories}
              onCategorySaved={loadCategories}
            />
          )}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CategoriesPage;
