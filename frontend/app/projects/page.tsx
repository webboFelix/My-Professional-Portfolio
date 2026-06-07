import { api, type Project } from '@/lib/api';
import { GlassCard } from '@/components/UI/GlassCard';
import { NeonButton } from '@/components/UI/NeonButton';
import { formatDate } from '@/lib/utils';

async function getProjects(): Promise<Project[]> {
  try {
    return await api.projects();
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-8 p-4 lg:p-8">
      <header>
        <p className="font-mono text-xs text-cyber-cyan">REPOSITORY_INDEX</p>
        <h1 className="font-display text-3xl text-white">Projects</h1>
        <p className="text-sm text-gray-500">GitHub-linked security tooling & research</p>
      </header>

      {projects.length === 0 ? (
        <GlassCard>
          <p className="font-mono text-sm text-gray-500">
            Start the backend API on port 4000 to load projects dynamically.
          </p>
        </GlassCard>
      ) : (
        <>
          {featured.length > 0 && (
            <section>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-cyber-green">
                Featured
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {featured.map((p) => (
                  <ProjectCard key={p.id} project={p} large />
                ))}
              </div>
            </section>
          )}
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">
              All Projects
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <GlassCard glow={project.featured ? 'cyan' : 'green'} className={large ? 'md:col-span-1' : ''}>
      <span className="font-mono text-[10px] uppercase text-cyber-amber">{project.category}</span>
      <h3 className="mt-1 font-display text-lg text-white">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-400 line-clamp-3">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span
            key={t}
            className="rounded border border-cyber-border px-2 py-0.5 font-mono text-[10px] text-cyber-green"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] text-gray-600">{formatDate(project.createdAt)}</p>
      {project.githubUrl && (
        <div className="mt-4">
          <NeonButton href={project.githubUrl} variant="outline">
            GitHub →
          </NeonButton>
        </div>
      )}
    </GlassCard>
  );
}
