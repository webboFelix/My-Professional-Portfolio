import { FormEvent, useState } from 'react';
import { adminApi } from '../services/api';

interface PostFormProps {
  onSuccess?: (msg: string) => void;
}

export function PostForm({ onSuccess }: PostFormProps) {
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await adminApi.createPost({
        title: fd.get('title'),
        slug: fd.get('slug'),
        excerpt: fd.get('excerpt'),
        content: fd.get('content'),
        tags: String(fd.get('tags'))
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        featured: fd.get('featured') === 'on',
      });
      onSuccess?.('Post created.');
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
      <label>Slug</label>
      <input name="slug" required placeholder="my-post-slug" />
      <label>Excerpt</label>
      <textarea name="excerpt" rows={2} required />
      <label>Content</label>
      <textarea name="content" rows={5} required />
      <label>Tags (comma-separated)</label>
      <input name="tags" placeholder="security, owasp" />
      <label>
        <input type="checkbox" name="featured" /> Featured
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  );
}
