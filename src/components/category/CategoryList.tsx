import { useState } from "react";
import { toast } from "react-toastify";
import { deleteCategory } from "../../services/categoryService";
import type { Category } from "../../types/category";
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
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?")) {
      try {
        await deleteCategory(categoryId);
        onDelete?.(categoryId);
        toast.success("Catégorie supprimée avec succès");
      } catch {
        toast.error("Échec de la suppression de la catégorie");
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
        <p>Aucune catégorie trouvée</p>
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
              Modifier
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="btn-delete"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
