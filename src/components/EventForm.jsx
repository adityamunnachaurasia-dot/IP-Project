import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { validateEventForm } from "../utils/validators";

const emptyForm = {
  name: "",
  category: "",
  date: "",
  time: "",
  venue: "",
  organizer: "",
  maxParticipants: "",
  description: "",
};

const categories = [
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "Other",
];

export default function EventForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const { events } = useApp();
  const navigate = useNavigate();

  // Load existing event if URL is #edit-<id>
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#edit-")) {
      const id = hash.replace("#edit-", "");
      const evt = events.find((e) => e.id === id);
      if (evt) {
        setForm(evt);
        setEditingId(id);
      }
    }
  }, [events]);

  // Load from props (for edit page)
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: vErrors } = validateEventForm(form);
    if (!valid) {
      setErrors(vErrors);
      return;
    }

    if (onSubmit) {
      onSubmit(form);
    } else if (editingId) {
      // handled by parent when used in AddEventPage
    }

    if (!editingId) setForm(emptyForm);
  };

  return (
    <form className="card-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label>Event Name *</label>
          <input
            className="input"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="e.g. Tech Fest 2025"
          />
          <small className="error">{errors.name}</small>
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            className="input"
            value={form.category}
            onChange={handleChange("category")}
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <small className="error">{errors.category}</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Event Date *</label>
          <input
            type="date"
            className="input"
            value={form.date}
            onChange={handleChange("date")}
          />
          <small className="error">{errors.date}</small>
        </div>

        <div className="form-group">
          <label>Event Time *</label>
          <input
            type="time"
            className="input"
            value={form.time}
            onChange={handleChange("time")}
          />
          <small className="error">{errors.time}</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Venue *</label>
          <input
            className="input"
            value={form.venue}
            onChange={handleChange("venue")}
            placeholder="e.g. Main Auditorium"
          />
          <small className="error">{errors.venue}</small>
        </div>

        <div className="form-group">
          <label>Organizer Name *</label>
          <input
            className="input"
            value={form.organizer}
            onChange={handleChange("organizer")}
            placeholder="e.g. Computer Science Dept."
          />
          <small className="error">{errors.organizer}</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Maximum Participants *</label>
          <input
            type="number"
            className="input"
            value={form.maxParticipants}
            onChange={handleChange("maxParticipants")}
            min="1"
            placeholder="e.g. 100"
          />
          <small className="error">{errors.maxParticipants}</small>
        </div>
      </div>

      <div className="form-group">
        <label>Event Description</label>
        <textarea
          className="input"
          rows="3"
          value={form.description}
          onChange={handleChange("description")}
          placeholder="Describe the event..."
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel || "Save Event"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/events")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}