interface CompletionProgressProps {
  completionRate: number;
}

function CompletionProgress({ completionRate }: CompletionProgressProps) {
  return (
    <div className="card">
      <h3>Completion Progress</h3>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${completionRate}%`,
          }}
        />
      </div>

      <p>{completionRate}%</p>
    </div>
  );
}

export default CompletionProgress;
