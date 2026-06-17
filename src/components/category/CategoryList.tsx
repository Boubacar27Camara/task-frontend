import { useState } from "react";
import { toast } from "react-toastify";
import { deleteCategory, Category } from "../../services/categoryService";
import CategoryForm from "./CategoryForm";

interface CategoryListProps {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onDelete?: (categoryId: number) => void;
  onCategorySaved?: () => void;
}

function CategoryList({
  categories,
  onEdit,
  onDelete,
  onCategorySaved,
}: CategoryListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingCategory(category);
    onEdit?.(category);
  };

  const handleDelete = async (categoryId: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId);
        onDelete?.(categoryId);
        toast.success("Category deleted successfully");
      } catch {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleCategorySaved = () => {
    setEditingId(null);
    setEditingCategory(undefined);
    onCategorySaved?.();
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="empty-state">
        <p>No categories found</p>
      </div>
    );
  }

  if (editingId && editingCategory) {
    return (
      <CategoryForm
        category={editingCategory}
        onCategorySaved={handleCategorySaved}
        onCancel={() => {
          setEditingId(null);
          setEditingCategory(undefined);
        }}
      />
    );
  }

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <div className="category-color" style={{ backgroundColor: category.color }} />
          <div className="category-info">
            <h3>{category.name}</h3>
            <p className="category-color-hex">{category.color}</p>
          </div>
          <div className="category-actions">
            <button
              onClick={() => handleEdit(category)}
              className="btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
