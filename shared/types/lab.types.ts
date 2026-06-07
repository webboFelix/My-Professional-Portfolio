export interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  status: 'active' | 'completed' | 'archived';
  tools: string[];
  url?: string;
  createdAt: string;
}
