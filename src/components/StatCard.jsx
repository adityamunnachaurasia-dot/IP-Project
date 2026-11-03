export default function StatCard({ icon, value, label, variant }) {
  return (
    <div className={`stat-card stat-${variant}`}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}