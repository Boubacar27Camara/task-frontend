import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StatsCards from "../components/dashboard/StatsCards";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import PriorityBarChart from "../components/dashboard/PriorityBarChart";
import CompletionProgress from "../components/dashboard/CompletionProgress";
import CategoryStatsTable from "../components/dashboard/CategoryStatsTable";

import { getStatistics } from "../services/dashboardService";

interface DashboardStats {
  totalTasks: number;
  completionRate: number;
  overdueTasksCount: number;
  tasksByStatus: Record<string, number>;
  tasksByPriority: Record<string, number> | null;
  tasksByCategory: Record<string, number> | null;
}

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await getStatistics();
      setStats(response.data);
    } catch {
      toast.error("Cannot load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container">
        <div className="error">Error loading dashboard</div>
      </div>
    );
  }

const statusData = Object.entries(stats.tasksByStatus || {}).map(
  ([key, value]) => ({
    name: key,
    value,
  })
);

const priorityData = Object.entries(stats.tasksByPriority || {}).map(
  ([key, value]) => ({
    name: key,
    value,
  })
);

const categoryData = Object.entries(stats.tasksByCategory || {}).map(
  ([key, value]) => ({
    name: key,
    value,
  })
);


  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={loadDashboard} className="btn-refresh">
          Refresh
        </button>
      </div>

      <StatsCards
        totalTasks={stats.totalTasks}
        overdueTasksCount={stats.overdueTasksCount}
        completionRate={stats.completionRate}
      />

      <div className="charts-grid">
        <StatusPieChart data={statusData} />
        <PriorityBarChart data={priorityData} />
      </div>

      <CompletionProgress completionRate={stats.completionRate} />

      <CategoryStatsTable categories={categoryData} />

      <ToastContainer />
    </div>
  );
  
}

export default DashboardPage;
