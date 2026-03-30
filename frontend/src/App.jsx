import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>📘 Study Tracker</h1>
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/subjects">Subjects</Link>
          <button
            className="btn-blue"
            style={{ marginLeft: "20px" }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Study Tracker | Designed by Harsha
      </footer>
    </div>
  );
}

export default App;
