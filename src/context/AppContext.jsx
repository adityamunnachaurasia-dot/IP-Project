import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useToast from "../hooks/useToast";
import { getSampleEvents } from "../utils/sampleData";
import {
  wasSeeded,
  markSeeded,
  clearAllStorage,
  loadTheme,
  saveTheme,
} from "../utils/storage";

/*
 * AppContext holds the global application state:
 * - events list
 * - registrations list
 * - theme (light/dark)
 * - toast notifications
 *
 * Any component can read or modify this state via useApp().
 */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ----- Events -----
  const [events, setEvents] = useLocalStorage("eventhub_events", []);

  // ----- Registrations -----
  const [registrations, setRegistrations] = useLocalStorage(
    "eventhub_registrations",
    []
  );

  // ----- Theme -----
  const [theme, setTheme] = useLocalStorage("eventhub_theme", loadTheme());

  // ----- Toast -----
  const { toast, showToast } = useToast();

  // Seed sample events once
  useEffect(() => {
    if (!wasSeeded() && events.length === 0) {
      setEvents(getSampleEvents());
      markSeeded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // ----- Event CRUD -----
  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: "evt_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      maxParticipants: Number(eventData.maxParticipants),
    };
    setEvents((prev) => [...prev, newEvent]);
    showToast("Event created successfully! 🎉", "success");
    return newEvent;
  };

  const updateEvent = (id, eventData) => {
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === id
          ? { ...evt, ...eventData, maxParticipants: Number(eventData.maxParticipants) }
          : evt
      )
    );
    showToast("Event updated successfully! ✅", "success");
  };

  const deleteEvent = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setEvents((prev) => prev.filter((evt) => evt.id !== id));
    setRegistrations((prev) => prev.filter((r) => r.eventId !== id));
    showToast("Event deleted.", "info");
  };

  const clearAll = () => {
    if (!window.confirm("This will permanently delete ALL events and registrations. Continue?"))
      return;
    setEvents([]);
    setRegistrations([]);
    clearAllStorage();
    showToast("All data cleared.", "info");
  };

  // ----- Registration -----
  const countRegistrations = (eventId) =>
    registrations.filter((r) => r.eventId === eventId).length;

  const registerParticipant = (regData) => {
    const evt = events.find((e) => e.id === regData.eventId);
    if (!evt) {
      showToast("Event not found.", "error");
      return false;
    }

    if (countRegistrations(evt.id) >= evt.maxParticipants) {
      showToast("Sorry, this event is full! 🚫", "error");
      return false;
    }

    const duplicate = registrations.some(
      (r) =>
        r.eventId === evt.id &&
        r.email.toLowerCase() === regData.email.toLowerCase()
    );
    if (duplicate) {
      showToast("This email is already registered for this event.", "error");
      return false;
    }

    setRegistrations((prev) => [
      ...prev,
      {
        ...regData,
        id: "reg_" + Date.now(),
        registeredAt: new Date().toISOString(),
      },
    ]);
    showToast("Registered successfully! 🎊", "success");
    return true;
  };

  const value = {
    events,
    registrations,
    theme,
    toast,
    showToast,
    toggleTheme,
    addEvent,
    updateEvent,
    deleteEvent,
    clearAll,
    registerParticipant,
    countRegistrations,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}