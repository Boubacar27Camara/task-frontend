import axiosInstance from "./axiosConfig";

export interface Category {
  id: number;
  name: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  color?: string;
}

// Get all categories
export const getCategories = () => {
  return axiosInstance.get<Category[]>("/categories");
};

// Get single category
export const getCategory = (id: number) => {
  return axiosInstance.get<Category>(`/categories/${id}`);
};

// Create category
export const createCategory = (data: CreateCategoryRequest) => {
  return axiosInstance.post<Category>("/categories", data);
};

// Update category
export const updateCategory = (id: number, data: Partial<Category>) => {
  return axiosInstance.put<Category>(`/categories/${id}`, data);
};

// Delete category
export const deleteCategory = (id: number) => {
  return axiosInstance.delete(`/categories/${id}`);
};
