import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { isCompleted } from "../utils/validators";
import StatCard from "../components/StatCard";
import EventCard from "../components/EventCard";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  const { events, registrations } = useApp();

  const total = events.length;
  const completed = events.filter(isCompleted).length;
  const upcoming = total - completed;

  const upcomingEvents = events
    .filter((e) => !isCompleted(e))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <div>
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to EventHub 🎉</h1>
          <p>Create, manage and register for college events — all in one place.</p>
          <Link to="/add" className="btn btn-primary">
            ＋ Create New Event
          </Link>
        </div>
        <div className="hero-art">📅</div>
      </div>

      <h2 className="section-title">Overview</h2>
      <div className="stats-grid">
        <StatCard icon="📋" value={total} label="Total Events" variant="blue" />
        <StatCard icon="⏳" value={upcoming} label="Upcoming Events" variant="purple" />
        <StatCard icon="✅" value={completed} label="Completed Events" variant="green" />
        <StatCard icon="👥" value={registrations.length} label="Total Registrations" variant="orange" />
      </div>

      <h2 className="section-title">Upcoming Events</h2>
      <div className="event-grid">
        {upcomingEvents.length === 0 ? (
          <EmptyState message="No upcoming events. Create one to get started! 🎉" />
        ) : (
          upcomingEvents.map((evt) => <EventCard key={evt.id} event={evt} />)
        )}
      </div>
    </div>
  );
}