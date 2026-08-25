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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200 transition">
        {label}
      </label>
      <input
        className={`control-input w-full text-sm shadow-sm placeholder:text-slate-600 ${className}`}
        {...props}
      />
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200 transition">
        {label}
      </label>
      <textarea
        className={`control-input w-full min-h-28 text-sm shadow-sm placeholder:text-slate-600 ${className}`}
        {...props}
      />
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200 transition">
        {label}
      </label>
      <select
        className={`control-input w-full text-sm shadow-sm ${className}`}
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
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-transparent p-2 text-sm font-medium text-gray-300 transition hover:border-cyan-500/30 hover:bg-cyan-500/5">
      <input
        type="checkbox"
        className="h-5 w-5 rounded-md border-2 border-white/20 bg-white/5 text-cyan-500 accent-cyan-500 transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
        {...props}
      />
      {label}
    </label>
  );
}
