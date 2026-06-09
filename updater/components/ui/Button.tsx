import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-blue-500",
  secondary: "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10",
  danger: "bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30",
  ghost: "text-gray-400 hover:text-white hover:bg-white/5",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
