import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/ui/Sidebar";

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
          <div className="min-h-screen bg-[#060b14] text-gray-100">
            <Sidebar />
            <main className="ml-64 min-h-screen p-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
