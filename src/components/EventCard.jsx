import { useApp } from "../context/AppContext";
import { isCompleted } from "../utils/validators";

export default function EventCard({ event }) {
  const { deleteEvent, countRegistrations } = useApp();
  const completed = isCompleted(event);
  const registered = countRegistrations(event.id);

  return (
    <div className="event-card">
      <h3>{event.name}</h3>

      <span className={`badge ${completed ? "completed" : ""}`}>
        {event.category}
        {completed ? " • Completed" : ""}
      </span>

      <div className="event-meta">
        <span>📅 {event.date} at {event.time}</span>
        <span>📍 {event.venue}</span>
        <span>👤 {event.organizer}</span>
        <span>
          👥 {registered} / {event.maxParticipants} registered
        </span>
      </div>

      {event.description && <p className="event-desc">{event.description}</p>}

      <div className="event-actions">
        <button
          className="btn btn-small btn-edit"
          onClick={() => (window.location.hash = `#edit-${event.id}`)}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-small btn-delete"
          onClick={() => deleteEvent(event.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}