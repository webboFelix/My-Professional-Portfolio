"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-slide-up flex items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-xl ${
              t.type === "success"
                ? "border-emerald-500/20 bg-emerald-950/90 text-emerald-100"
                : "border-red-500/20 bg-red-950/90 text-red-100"
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle size={18} className="shrink-0 text-red-400" />
            )}
            <span className="text-sm">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="ml-2 shrink-0 opacity-60 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
