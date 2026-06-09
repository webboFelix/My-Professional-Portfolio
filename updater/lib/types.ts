export interface Post {
  $id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  wordCount: number;
  readTime: number;
  tags: string[];
  published: boolean;
  coverImage?: string;
}

export interface Lab {
  $id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  difficulty: string;
  platform: string;
  tags: string[];
  published: boolean;
}

export interface Project {
  $id: string;
  title: string;
  description: string;
  githubLink?: string;
  liveLink?: string;
  technologies: string[];
  date: string;
  featured: boolean;
}

export interface Video {
  $id: string;
  title: string;
  slug: string;
  description: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  duration?: number;
  thumbnailUrl?: string;
  tags: string[];
  date: string;
  published: boolean;
}

export interface Contact {
  $id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}
