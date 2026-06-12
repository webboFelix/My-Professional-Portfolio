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
