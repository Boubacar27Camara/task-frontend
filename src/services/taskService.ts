import axiosInstance from "./axiosConfig";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  category?: {
    id: number;
    name: string;
  };
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  categoryId?: number;
  dueDate?: string;
}

export interface TaskFilter {
  status?: string;
  priority?: string;
  categoryId?: number;
  search?: string;
}

// Get all tasks with optional filters
export const getTasks = (filters?: TaskFilter) => {
  return axiosInstance.get<Task[]>("/tasks", { params: filters });
};

// Get single task
export const getTask = (id: number) => {
  return axiosInstance.get<Task>(`/tasks/${id}`);
};

// Create task
export const createTask = (data: CreateTaskRequest) => {
  return axiosInstance.post<Task>("/tasks", data);
};

// Update task
export const updateTask = (id: number, data: Partial<Task>) => {
  return axiosInstance.put<Task>(`/tasks/${id}`, data);
};

// Change task status
export const changeTaskStatus = (id: number, status: string) => {
  return axiosInstance.patch<Task>(`/tasks/${id}/status`, { status });
};

// Delete task
export const deleteTask = (id: number) => {
  return axiosInstance.delete(`/tasks/${id}`);
};
