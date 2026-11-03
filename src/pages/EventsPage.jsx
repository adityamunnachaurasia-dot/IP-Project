import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";

export default function EventsPage() {
  const { events, clearAll } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");

  // Derived filtered + sorted list
  const filtered = useMemo(() => {
    let list = events.slice();

    if (search.trim()) {
      list = list.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      list = list.filter((e) => e.category === category);
    }

    if (sortBy === "date-asc") {
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "date-desc") {
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [events, search, category, sortBy]);

  return (
    <div>
      <h2 className="section-title">All Events</h2>

      <div className="toolbar">
        <input
          className="input"
          placeholder="🔍 Search events by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Technical">Technical</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Other">Other</option>
        </select>
        <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-asc">Sort: Date (Earliest)</option>
          <option value="date-desc">Sort: Date (Latest)</option>
          <option value="name-asc">Sort: Name (A–Z)</option>
        </select>
        <button className="btn btn-danger" onClick={clearAll}>
          🗑️ Clear All
        </button>
      </div>

      <div className="event-grid">
        {filtered.length === 0 ? (
          <EmptyState message="No events match your search. Try different filters. 🔍" />
        ) : (
          filtered.map((evt) => <EventCard key={evt.id} event={evt} />)
        )}
      </div>
    </div>
  );
}