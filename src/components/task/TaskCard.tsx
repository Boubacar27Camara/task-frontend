import type { Task } from "../../services/taskService";
import { changeTaskStatus, deleteTask } from "../../services/taskService";
import { toast } from "react-toastify";

interface TaskCardProps {
  task: Task;
  onStatusChange?: (taskId: number, status: string) => void;
  onDelete?: (taskId: number) => void;
}

function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    try {
      await changeTaskStatus(task.id, newStatus);
      onStatusChange?.(task.id, newStatus);
      toast.success("Task status updated");
    } catch {
      toast.error("Failed to update task status");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task.id);
        onDelete?.(task.id);
        toast.success("Task deleted successfully");
      } catch {
        toast.error("Failed to delete task");
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "#ef4444";
      case "MEDIUM":
        return "#f59e0b";
      case "LOW":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span
            className="priority-badge"
            style={{ borderColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-info">
        {task.category && <span className="category-badge">{task.category.name}</span>}
        {task.dueDate && <span className="due-date">{task.dueDate}</span>}
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
