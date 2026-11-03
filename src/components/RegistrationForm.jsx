import { useState } from "react";
import { useApp } from "../context/AppContext";
import { validateRegistration } from "../utils/validators";

const emptyForm = { eventId: "", name: "", email: "", phone: "" };

export default function RegistrationForm() {
  const { events, registerParticipant, countRegistrations } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: vErrors } = validateRegistration(form);
    if (!valid) {
      setErrors(vErrors);
      return;
    }

    const success = registerParticipant(form);
    if (success) {
      setForm(emptyForm);
      setErrors({});
    }
  };

  return (
    <form className="card-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label>Select Event *</label>
          <select
            className="input"
            value={form.eventId}
            onChange={handleChange("eventId")}
          >
            <option value="">-- Select an Event --</option>
            {events
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((evt) => {
                const filled =
                  countRegistrations(evt.id) >= evt.maxParticipants;
                return (
                  <option key={evt.id} value={evt.id} disabled={filled}>
                    {evt.name} ({evt.date}){filled ? " — FULL" : ""}
                  </option>
                );
              })}
          </select>
          <small className="error">{errors.eventId}</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Participant Name *</label>
          <input
            className="input"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Your full name"
          />
          <small className="error">{errors.name}</small>
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
          />
          <small className="error">{errors.email}</small>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Contact Number *</label>
          <input
            type="tel"
            className="input"
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder="10-digit number"
          />
          <small className="error">{errors.phone}</small>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Register</button>
      </div>
    </form>
  );
}