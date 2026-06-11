"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { TopBar } from "@/components/ui/TopBar";
import { AppBackground } from "@/components/ui/AppBackground";

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-gray-100">
      <AppBackground />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
