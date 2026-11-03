import { useApp } from "../context/AppContext";
import EmptyState from "./EmptyState";

export default function RegistrationList() {
  const { registrations, events } = useApp();

  if (registrations.length === 0) {
    return <EmptyState message="No registrations yet. Register for an event above!" />;
  }

  return (
    <div>
      {registrations
        .slice()
        .reverse()
        .map((reg) => {
          const evt = events.find((e) => e.id === reg.eventId);
          const eventName = evt ? evt.name : "(deleted event)";

          return (
            <div key={reg.id} className="reg-item">
              <strong>{reg.name}</strong> registered for{" "}
              <strong>{eventName}</strong> • 📧 {reg.email} • 📞 {reg.phone}
            </div>
          );
        })}
    </div>
  );
}