import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import CategoriesPage from "./pages/CategoriesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-content">
            <h1 className="navbar-title">📋 Task Manager</h1>
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
              <Link to="/tasks" className="nav-link">
                Tasks
              </Link>
              <Link to="/categories" className="nav-link">
                Categories
              </Link>
            </div>
          </div>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Task Manager - Gestion de tâches personnelles</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
