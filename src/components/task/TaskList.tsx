import type { Task } from "../../services/taskService";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onStatusChange?: (taskId: number, status: string) => void;
  onDelete?: (taskId: number) => void;
}

function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Aucune tâche trouvée</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
