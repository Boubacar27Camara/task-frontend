import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "./TaskCard";
import type { Task } from "../../services/taskService";

// Mock services
vi.mock("../../services/taskService", () => ({
  changeTaskStatus: vi.fn().mockResolvedValue({ data: {} }),
  deleteTask: vi.fn().mockResolvedValue({}),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("TaskCard", () => {
  const mockTask: Task = {
    id: 1,
    title: "Task A",
    status: "TODO",
    priority: "MEDIUM",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  };

  it("calls onStatusChange when status is changed", async () => {
    const mockCallback = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onStatusChange={mockCallback}
      />
    );

    const selectElement = screen.getByDisplayValue("TODO") as HTMLSelectElement;
    fireEvent.change(selectElement, {
      target: { value: "DONE" },
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockCallback).toHaveBeenCalledWith(1, "DONE");
  });
});
