import { useState } from 'react';
import { ProjectForm } from '../components/ProjectForm';

export default function CreateProject() {
  const [msg, setMsg] = useState('');
  return (
    <div className="admin-card">
      <h2>Create Project</h2>
      {msg && <p style={{ color: msg.startsWith('Error') ? '#ff3366' : '#00ff9d' }}>{msg}</p>}
      <ProjectForm onSuccess={setMsg} />
    </div>
  );
}
