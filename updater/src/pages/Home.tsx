export default function Home() {
  return (
    <div className="admin-card">
      <h2>Control Panel</h2>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
        Use the sidebar to publish posts, labs, and projects to the public portfolio API.
        Keep this panel private — add auth (API keys, OAuth) before production.
      </p>
      <ul style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '1rem' }}>
        <li>Frontend: http://localhost:3000</li>
        <li>API: http://localhost:4000</li>
        <li>Admin: http://localhost:5173</li>
      </ul>
    </div>
  );
}
