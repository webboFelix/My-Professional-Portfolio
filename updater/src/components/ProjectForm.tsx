import { FormEvent, useState } from 'react';
import { adminApi } from '../services/api';

export function ProjectForm({ onSuccess }: { onSuccess?: (msg: string) => void }) {
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await adminApi.createProject({
        title: fd.get('title'),
        description: fd.get('description'),
        category: fd.get('category'),
        techStack: String(fd.get('techStack'))
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        githubUrl: fd.get('githubUrl') || undefined,
        liveUrl: fd.get('liveUrl') || undefined,
        featured: fd.get('featured') === 'on',
      });
      onSuccess?.('Project created.');
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
      <label>Tech stack (comma-separated)</label>
      <input name="techStack" required />
      <label>GitHub URL</label>
      <input name="githubUrl" type="url" />
      <label>Live URL</label>
      <input name="liveUrl" type="url" />
      <label>
        <input type="checkbox" name="featured" /> Featured
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Create Project'}
      </button>
    </form>
  );
}
