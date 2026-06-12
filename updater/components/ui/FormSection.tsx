import { LucideIcon } from "lucide-react";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function FormSection({
  title,
  description,
  icon: Icon,
  children,
}: FormSectionProps) {
  return (
    <section className="space-y-4 rounded-2xl border-2 border-white/5 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-lg backdrop-blur-sm transition hover:border-white/10 hover:from-white/[0.08]">
      <div className="flex items-start gap-4 border-b border-white/5 pb-4">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 ring-1 ring-cyan-500/30">
            <Icon size={20} className="text-cyan-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
