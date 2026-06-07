const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    next: options?.method ? undefined : { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  featured?: boolean;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  status: string;
  tools: string[];
  url?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  featured?: boolean;
  createdAt: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: string;
  source: string;
  message: string;
}

export const api = {
  health: () => fetchApi<{ status: string }>('/api/health'),
  posts: () => fetchApi<Post[]>('/api/posts'),
  labs: () => fetchApi<Lab[]>('/api/labs'),
  projects: () => fetchApi<Project[]>('/api/projects'),
  logs: (limit = 50) => fetchApi<LogEntry[]>(`/api/logs?limit=${limit}`),
};

export const SKILLS = [
  { subject: 'VAPT / Pentest', value: 90 },
  { subject: 'Web Security', value: 88 },
  { subject: 'Network Security', value: 86 },
  { subject: 'Cloud Security', value: 85 },
  { subject: 'Python / Automation', value: 92 },
  { subject: 'OWASP / AppSec', value: 88 },
];

export const CERTIFICATIONS = [
  { name: 'CompTIA Security+', status: 'Active', year: '2025' },
  { name: 'CEH', status: 'In Progress', year: '2026' },
  { name: 'AWS Cloud Practitioner', status: 'Active', year: '2025' },
];

export const TIMELINE = [
  { year: '2026', event: 'SOC-style portfolio & threat intel tooling' },
  { year: '2025', event: 'Web app pentesting focus — OWASP labs' },
  { year: '2024', event: 'Cloud security & IAM hardening projects' },
  { year: '2023', event: 'Started cybersecurity journey — home lab' },
];
