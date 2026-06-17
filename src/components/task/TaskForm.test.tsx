import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";

// Mock the service
vi.mock("../../services/taskService", () => ({
  createTask: vi.fn().mockResolvedValue({ data: { id: 1 } }),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => null,
}));

describe("TaskForm", () => {
  it("renders form fields", () => {
    render(<TaskForm categories={[]} onTaskCreated={() => {}} />);

    expect(screen.getByPlaceholderText("Task title")).toBeInTheDocument();
    expect(screen.getByText("Create Task")).toBeInTheDocument();
  });

  it("shows validation error when title is empty", () => {
    render(<TaskForm categories={[]} onTaskCreated={() => {}} />);

    const button = screen.getByText("Create Task");
    fireEvent.click(button);

    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });

  it("calls onTaskCreated when form is submitted with valid data", async () => {
    const mockCallback = vi.fn();

    render(<TaskForm categories={[]} onTaskCreated={mockCallback} />);

    const titleInput = screen.getByPlaceholderText("Task title");
    fireEvent.change(titleInput, {
      target: { value: "My Task" },
    });

    const button = screen.getByText("Create Task");
    fireEvent.click(button);

    // Wait for async operation
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockCallback).toHaveBeenCalled();
  });
});
