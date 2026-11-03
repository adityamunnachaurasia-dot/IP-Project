import RegistrationForm from "../components/RegistrationForm";
import RegistrationList from "../components/RegistrationList";

export default function RegisterPage() {
  return (
    <div>
      <h2 className="section-title">Event Registration</h2>
      <RegistrationForm />

      <h3 className="section-title" style={{ marginTop: "2rem" }}>
        Registered Participants
      </h3>
      <RegistrationList />
    </div>
  );
}