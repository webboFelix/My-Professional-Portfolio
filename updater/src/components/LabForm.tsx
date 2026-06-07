import { FormEvent, useState } from 'react';
import { adminApi } from '../services/api';

export function LabForm({ onSuccess }: { onSuccess?: (msg: string) => void }) {
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await adminApi.createLab({
        title: fd.get('title'),
        description: fd.get('description'),
        difficulty: fd.get('difficulty'),
        category: fd.get('category'),
        status: fd.get('status'),
        tools: String(fd.get('tools'))
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        url: fd.get('url') || undefined,
      });
      onSuccess?.('Lab created.');
      e.currentTarget.reset();
    } catch (err) {
      onSuccess?.(`Error: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <label>Title</label>
      <input name="title" required />
      <label>Description</label>
      <textarea name="description" rows={3} required />
      <label>Category</label>
      <input name="category" required />
      <label>Difficulty</label>
      <select name="difficulty" defaultValue="intermediate">
        <option value="beginner">beginner</option>
        <option value="intermediate">intermediate</option>
        <option value="advanced">advanced</option>
        <option value="expert">expert</option>
      </select>
      <label>Status</label>
      <select name="status" defaultValue="active">
        <option value="active">active</option>
        <option value="completed">completed</option>
        <option value="archived">archived</option>
      </select>
      <label>Tools (comma-separated)</label>
      <input name="tools" placeholder="Burp, Python" />
      <label>URL</label>
      <input name="url" type="url" />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Create Lab'}
      </button>
    </form>
  );
}
