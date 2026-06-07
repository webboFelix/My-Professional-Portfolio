import { api, type Lab } from '@/lib/api';
import { GlassCard } from '@/components/UI/GlassCard';
import { cn } from '@/lib/utils';

async function getLabs(): Promise<Lab[]> {
  try {
    return await api.labs();
  } catch {
    return [];
  }
}

const difficultyColor: Record<string, string> = {
  beginner: 'text-cyber-green',
  intermediate: 'text-cyber-cyan',
  advanced: 'text-cyber-amber',
  expert: 'text-cyber-red',
};

export default async function LabsPage() {
  const labs = await getLabs();

  return (
    <div className="space-y-8 p-4 lg:p-8">
      <header>
        <p className="font-mono text-xs text-cyber-cyan">TRAINING_ENV</p>
        <h1 className="font-display text-3xl text-white">Security Labs</h1>
        <p className="text-sm text-gray-500">Hands-on offensive & defensive exercises</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {labs.length === 0 ? (
          <GlassCard className="md:col-span-2 lg:col-span-3">
            <p className="font-mono text-sm text-gray-500">No labs loaded. Run the API backend.</p>
          </GlassCard>
        ) : (
          labs.map((lab) => (
            <GlassCard key={lab.id} title={lab.category}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-mono text-lg text-cyber-cyan">{lab.title}</h3>
                <span
                  className={cn(
                    'shrink-0 rounded px-2 py-0.5 font-mono text-[10px] uppercase',
                    difficultyColor[lab.difficulty] || 'text-gray-400'
                  )}
                >
                  {lab.difficulty}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-400">{lab.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {lab.tools.map((t) => (
                  <span key={t} className="text-[10px] text-gray-500">
                    #{t}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-mono text-xs">
                Status:{' '}
                <span className={lab.status === 'active' ? 'text-cyber-green' : 'text-gray-500'}>
                  {lab.status.toUpperCase()}
                </span>
              </p>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
