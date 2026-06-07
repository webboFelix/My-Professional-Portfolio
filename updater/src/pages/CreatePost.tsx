import { useState } from 'react';
import { PostForm } from '../components/PostForm';

export default function CreatePost() {
  const [msg, setMsg] = useState('');
  return (
    <div className="admin-card">
      <h2>Create Post</h2>
      {msg && <p className="ok" style={{ color: msg.startsWith('Error') ? '#ff3366' : '#00ff9d' }}>{msg}</p>}
      <PostForm onSuccess={setMsg} />
    </div>
  );
}
