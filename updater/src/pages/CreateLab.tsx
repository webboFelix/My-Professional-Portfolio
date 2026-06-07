import { useState } from 'react';
import { LabForm } from '../components/LabForm';

export default function CreateLab() {
  const [msg, setMsg] = useState('');
  return (
    <div className="admin-card">
      <h2>Create Lab</h2>
      {msg && <p style={{ color: msg.startsWith('Error') ? '#ff3366' : '#00ff9d' }}>{msg}</p>}
      <LabForm onSuccess={setMsg} />
    </div>
  );
}
