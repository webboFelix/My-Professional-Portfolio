const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function getAdminKey(): string {
  return (
    import.meta.env.VITE_ADMIN_API_KEY ||
    sessionStorage.getItem('admin_api_key') ||
    ''
  );
}

function adminHeaders(): HeadersInit {
  const key = getAdminKey();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (key) headers['X-API-Key'] = key;
  return headers;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...adminHeaders(), ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export function saveAdminKey(key: string) {
  sessionStorage.setItem('admin_api_key', key);
}

export const adminApi = {
  health: () =>
    fetch(`${API_BASE}/api/health`).then((r) => r.json() as Promise<{ status: string }>),
  verifyKey: () =>
    fetch(`${API_BASE}/api/auth/verify`, { headers: adminHeaders() }).then(async (r) => {
      const data = await r.json();
      if (!r.ok) throw new Error((data as { error?: string }).error || 'Invalid key');
      return data as { ok: boolean; mode: string };
    }),
  createPost: (body: Record<string, unknown>) =>
    request('/api/posts', { method: 'POST', body: JSON.stringify(body) }),
  createLab: (body: Record<string, unknown>) =>
    request('/api/labs', { method: 'POST', body: JSON.stringify(body) }),
  createProject: (body: Record<string, unknown>) =>
    request('/api/projects', { method: 'POST', body: JSON.stringify(body) }),
};
