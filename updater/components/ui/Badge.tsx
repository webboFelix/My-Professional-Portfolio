interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info";
}

const variants = {
  default: "bg-white/10 text-gray-300",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  info: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
