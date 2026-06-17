import axiosInstance from "./axiosConfig";

interface DashboardStats {
  totalTasks: number;
  completionRate: number;
  overdueTasksCount: number;
  tasksByStatus: Record<string, number>;
  tasksByPriority: Record<string, number>;
  tasksByCategory: Record<string, number>;
}

export const getStatistics = () => {
  return axiosInstance.get<DashboardStats>("/dashboard/stats");
};
