interface CategoryData {
  name: string;
  value: number;
}

interface CategoryStatsTableProps {
  categories: CategoryData[];
}

function CategoryStatsTable({ categories }: CategoryStatsTableProps) {
  return (
    <div className="card">
      <h3>Tasks by Category</h3>

      <table className="stats-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryStatsTable;
