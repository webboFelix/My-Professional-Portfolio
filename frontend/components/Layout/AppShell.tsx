"use client";

import { usePathname } from "next/navigation";
import { GridBackground } from "@/components/UI/GridBackground";
import { CyberFrame } from "@/components/Layout/CyberFrame";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { AccessGuard } from "@/components/Layout/AccessGuard";

const FULLSCREEN_ROUTES = ["/", "/gate"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullscreen = FULLSCREEN_ROUTES.includes(pathname);

  if (fullscreen) {
    return <>{children}</>;
  }

  return (
    <>
      <GridBackground />
      <CyberFrame>
        <AccessGuard>
          <div className="relative z-10 flex min-h-screen flex-col overflow-x-hidden">
            <div className="flex flex-1 overflow-x-hidden">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-x-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden">{children}</main>
              </div>
            </div>
            <Footer />
          </div>
        </AccessGuard>
      </CyberFrame>
    </>
  );
}
