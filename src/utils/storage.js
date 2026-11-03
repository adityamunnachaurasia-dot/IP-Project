/* LocalStorage helpers with JSON serialization */

const EVENTS_KEY = "eventhub_events";
const REGS_KEY = "eventhub_registrations";
const THEME_KEY = "eventhub_theme";
const SEED_KEY = "eventhub_seeded";

export function loadEvents() {
  try {
    return JSON.parse(localStorage.getItem(EVENTS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function loadRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(REGS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveRegistrations(regs) {
  localStorage.setItem(REGS_KEY, JSON.stringify(regs));
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function wasSeeded() {
  return localStorage.getItem(SEED_KEY) === "true";
}

export function markSeeded() {
  localStorage.setItem(SEED_KEY, "true");
}

export function clearAllStorage() {
  localStorage.removeItem(EVENTS_KEY);
  localStorage.removeItem(REGS_KEY);
  localStorage.removeItem(SEED_KEY);
}