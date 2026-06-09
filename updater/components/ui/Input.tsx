import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldProps {
  label: string;
  hint?: string;
}

export function Input({
  label,
  hint,
  className = "",
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 ${className}`}
        {...props}
      />
      {hint && <p className="mt-1 text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  className = "",
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <textarea
        className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 ${className}`}
        {...props}
      />
      {hint && <p className="mt-1 text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

export function Select({
  label,
  children,
  className = "",
  ...props
}: FieldProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <select
        className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export function Checkbox({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-300">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/30"
        {...props}
      />
      {label}
    </label>
  );
}
