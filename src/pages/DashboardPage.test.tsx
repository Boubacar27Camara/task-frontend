import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "./../pages/DashboardPage";

vi.mock("../services/dashboardService", () => ({
    
  getStatistics: vi.fn().mockResolvedValue({
    data: {
      totalTasks: 25,
      completionRate: 50,
      overdueTasksCount: 3,
      tasksByStatus: {
        TODO: 8,
        IN_PROGRESS: 7,
        DONE: 10,
      },
      tasksByPriority: {
        LOW: 6,
        MEDIUM: 11,
        HIGH: 8,
      },
      tasksByCategory: {
        Development: 12,
        Training: 8,
        Personal: 5,
      },
    },
  }),
  
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => null,
}));

vi.mock("../components/dashboard/StatsCards", () => ({
  default: () => <div>Stats Cards Mock</div>,
}));

vi.mock("../components/dashboard/StatusPieChart", () => ({
  default: () => <div>Status Pie Chart Mock</div>,
}));

vi.mock("../components/dashboard/PriorityBarChart", () => ({
  default: () => <div>Priority Bar Chart Mock</div>,
}));

vi.mock("../components/dashboard/CompletionProgress", () => ({
  default: () => <div>Completion Progress Mock</div>,
}));

vi.mock("../components/dashboard/CategoryStatsTable", () => ({
  default: () => <div>Category Stats Table Mock</div>,
}));

describe("DashboardPage", () => {
 it("shows loading state initially", async () => {
  render(<DashboardPage />);

  expect(
    screen.getByText("Loading...")
  ).toBeInTheDocument();
});

  it("displays statistics after loading", async () => {
    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    expect(screen.getByText("Stats Cards Mock")).toBeInTheDocument();
  });
});
