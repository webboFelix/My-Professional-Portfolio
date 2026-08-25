import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

const variants = {
  primary:
    "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-300",
  secondary:
    "border border-white/10 bg-white/5 text-gray-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white",
  danger:
    "border border-red-500/30 bg-red-600/20 text-red-400 hover:bg-red-600/30",
  ghost: "text-gray-400 hover:bg-white/5 hover:text-white",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
