/* Input validation helpers */

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\d{10}$/;

/* Validate event form; returns { valid, errors } */
export function validateEventForm(data) {
  const errors = {};

  if (!data.name.trim()) errors.name = "Event name is required.";
  if (!data.category) errors.category = "Please select a category.";
  if (!data.date) errors.date = "Event date is required.";
  if (!data.time) errors.time = "Event time is required.";
  if (!data.venue.trim()) errors.venue = "Venue is required.";
  if (!data.organizer.trim()) errors.organizer = "Organizer name is required.";

  const max = Number(data.maxParticipants);
  if (!data.maxParticipants || isNaN(max) || max < 1) {
    errors.maxParticipants = "Maximum participants must be at least 1.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/* Validate registration form */
export function validateRegistration(data) {
  const errors = {};

  if (!data.eventId) errors.eventId = "Please select an event.";
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!emailRegex.test(data.email)) errors.email = "Enter a valid email address.";
  if (!phoneRegex.test(data.phone)) errors.phone = "Enter a valid 10-digit number.";

  return { valid: Object.keys(errors).length === 0, errors };
}

/* Check if event date has already passed */
export function isCompleted(event) {
  const eventDate = new Date(event.date + "T" + (event.time || "23:59"));
  return eventDate < new Date();
}

export function generateId(prefix = "evt") {
  return prefix + "_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
}