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
    <section className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
      <div className="mb-5 flex items-start gap-3 border-b border-white/5 pb-4">
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
            <Icon size={18} className="text-cyan-400" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
