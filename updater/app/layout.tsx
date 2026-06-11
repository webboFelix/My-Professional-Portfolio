import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { StatsProvider } from "@/components/providers/StatsProvider";
import { AppShell } from "@/components/ui/AppShell";

export const metadata: Metadata = {
  title: "Portfolio Admin",
  description: "Manage posts, labs, projects, and videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <ToastProvider>
            <StatsProvider>
              <AppShell>{children}</AppShell>
            </StatsProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
