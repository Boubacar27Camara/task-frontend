import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryList from "./CategoryList";
import type { Category } from "../../services/categoryService";

vi.mock("../../services/categoryService", () => ({
  deleteCategory: vi.fn().mockResolvedValue({}),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("./CategoryForm", () => ({
  default: () => <div>Category Form Mock</div>,
}));

describe("CategoryList", () => {
  const mockCategories: Category[] = [
    {
      id: 1,
      name: "Dev",
      color: "#3b82f6",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ];

  it("calls onDelete when delete button is clicked", async () => {
    const mockCallback = vi.fn();
    window.confirm = vi.fn(() => true);

    render(
      <CategoryList
        categories={mockCategories}
        onDelete={mockCallback}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(mockCallback).toHaveBeenCalled();
  });
});
