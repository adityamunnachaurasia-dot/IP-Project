export default function AboutPage() {
  return (
    <div>
      <h2 className="section-title">About This Project</h2>
      <div className="about-card">
        <h3>🎓 Event Management System (React)</h3>
        <p>
          A modern, responsive single-page application built with <strong>React</strong>.
          It allows users to create, manage, view, update, delete and register for events
          — with all data stored persistently in the browser using <strong>LocalStorage</strong>.
        </p>
        <ul>
          <li><strong>React</strong> — component-based UI with hooks and Context API</li>
          <li><strong>React Router</strong> — client-side page navigation</li>
          <li><strong>CSS3</strong> — responsive layout, animations, light/dark theme</li>
          <li><strong>LocalStorage</strong> — persistent data across refreshes</li>
        </ul>
        <p className="muted">
          No backend or database required. Runs entirely in the browser.
        </p>
      </div>
    </div>
  );
}