import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import type { Task } from "../../services/taskService";

vi.mock("./TaskCard", () => ({
  default: () => <div>Task Card Mock</div>,
}));

describe("TaskList", () => {
  it("displays empty state message when no tasks", () => {
    render(<TaskList tasks={[]} />);

    expect(screen.getByText("Aucune tâche trouvée")).toBeInTheDocument();
  });

  it("renders tasks when data is provided", () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: "Task A",
        status: "TODO",
        priority: "MEDIUM",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
    ];

    render(<TaskList tasks={tasks} />);

    expect(screen.getByText("Task Card Mock")).toBeInTheDocument();
  });
});
