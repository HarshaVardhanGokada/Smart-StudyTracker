import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "12px",
        display: "flex",
        gap: "20px",
        color: "white",
      }}
    >
      <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
      <Link to="/subjects" style={{ color: "white" }}>Subjects</Link>
      <Link to="/create" style={{ color: "white" }}>Create Subject</Link>
      <Link to="/groups" style={{ color: "white" }}>Groups</Link>
      <Link to="/explore" style={{ color: "white" }}>Explore</Link>

      {/* Google Login */}
      <a
        href="http://localhost:3001/auth/google"
        style={{ color: "lightgreen" }}
      >
        Login with Google
      </a>

      {/* Logout */}
      <a
        href="http://localhost:3001/auth/logout"
        style={{ color: "tomato" }}
      >
        Logout
      </a>
    </nav>
  );
}

export default Navbar;
