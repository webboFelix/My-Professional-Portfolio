import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 60000, // 60 second timeout like updater
  headers: {
    "Content-Type": "application/json",
  },
});

/** List endpoints — include drafts/unpublished items in admin panel */
export const listAll = (path: string) =>
  api.get(path, { params: { all: "true" } });

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  featured?: boolean;
  coverImage?: string;
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
  coverImage?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage?: string;
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

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  category?: string;
  tags?: string[];
  createdAt: string;
}

export interface Stats {
  totalPosts: number;
  totalProjects: number;
  totalLabs: number;
  totalViews?: number;
}

export const SKILLS = [
  { subject: "VAPT / Pentest", value: 90 },
  { subject: "Web Security", value: 88 },
  { subject: "Network Security", value: 86 },
  { subject: "Cloud Security", value: 85 },
  { subject: "Python / Automation", value: 92 },
  { subject: "OWASP / AppSec", value: 88 },
];

export const CERTIFICATIONS = [
  { name: "Cloud and Network Security", status: "Active", year: "2026" },
  { name: "CEH", status: "Active", year: "2026" },
  {
    name: "Automated Security Testing with Python",
    status: "In Progress",
    year: "2026",
  },
];

export const TIMELINE = [
  { year: "2026", event: "Cloud and Network Security & VAPT" },
  { year: "2025", event: "Web app pentesting focus — OWASP labs" },
  { year: "2024", event: "Cybersecurity Research & Development" },
  { year: "2023", event: "Web Development & Cybersecurity Foundation" },
];

export default api;
