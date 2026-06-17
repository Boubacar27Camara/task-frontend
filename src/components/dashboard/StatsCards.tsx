interface StatsCardsProps {
  totalTasks: number;
  overdueTasksCount: number;
  completionRate: number;
}

function StatsCards({
  totalTasks,
  overdueTasksCount,
  completionRate,
}: StatsCardsProps) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Tasks</h3>
        <h1>{totalTasks}</h1>
      </div>

      <div className="stat-card overdue">
        <h3>Overdue Tasks</h3>
        <h1>{overdueTasksCount}</h1>
      </div>

      <div className="stat-card">
        <h3>Completion Rate</h3>
        <h1>{completionRate}%</h1>
      </div>
    </div>
  );
}

export default StatsCards;
