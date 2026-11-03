import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import EventForm from "../components/EventForm";

export default function AddEventPage() {
  const { events, addEvent, updateEvent } = useApp();
  const [editingEvent, setEditingEvent] = useState(null);
  const navigate = useNavigate();

  // Detect edit mode from URL hash: #edit-<id>
  useEffect(() => {
    const checkEdit = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#edit-")) {
        const id = hash.replace("#edit-", "");
        const evt = events.find((e) => e.id === id);
        setEditingEvent(evt || null);
      } else {
        setEditingEvent(null);
      }
    };
    checkEdit();
    window.addEventListener("hashchange", checkEdit);
    return () => window.removeEventListener("hashchange", checkEdit);
  }, [events]);

  const handleSubmit = (formData) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
      window.location.hash = "";
    } else {
      addEvent(formData);
    }
    navigate("/events");
  };

  return (
    <div>
      <h2 className="section-title">
        {editingEvent ? "Edit Event" : "Add New Event"}
      </h2>
      <EventForm
        key={editingEvent ? editingEvent.id : "new"}
        initialData={
          editingEvent
            ? {
                name: editingEvent.name,
                category: editingEvent.category,
                date: editingEvent.date,
                time: editingEvent.time,
                venue: editingEvent.venue,
                organizer: editingEvent.organizer,
                maxParticipants: editingEvent.maxParticipants,
                description: editingEvent.description || "",
              }
            : null
        }
        onSubmit={handleSubmit}
        submitLabel={editingEvent ? "Update Event" : "Save Event"}
      />
    </div>
  );
}