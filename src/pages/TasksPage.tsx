import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskForm from "../components/task/TaskForm";
import TaskList from "../components/task/TaskList";

import { getTasks } from "../services/taskService";
import type { Task } from "../services/taskService";
import { getCategories } from "../services/categoryService";
import type { Category } from "../services/categoryService";

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks({
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        search: filters.search || undefined,
      });
      setTasks(response.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1>Tasks Management</h1>

      <div className="page-layout">
        <aside className="sidebar">
          <TaskForm categories={categories} onTaskCreated={loadTasks} />
        </aside>

        <main className="main-content">
          <div className="filters">
            <input
              type="text"
              name="search"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={handleFilterChange}
              className="filter-input"
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList tasks={tasks} onStatusChange={loadTasks} onDelete={loadTasks} />
          )}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}

export default TasksPage;
