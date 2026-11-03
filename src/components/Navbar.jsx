import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/events", label: "All Events" },
  { to: "/add", label: "Add Event" },
  { to: "/register", label: "Registration" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-brand">
        <span className="logo">🎟️</span>
        <span className="brand-name">EventHub</span>
      </div>

      <button
        className="hamburger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}

        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
}