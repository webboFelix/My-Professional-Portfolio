import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Updater - Cyber Portfolio",
  description: "Manage posts, labs, projects, and videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="min-h-screen bg-gray-950 text-gray-100">
            <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
              <div className="container mx-auto px-4 py-3 flex gap-6">
                <a href="/" className="font-bold text-cyan-400">
                  Dashboard
                </a>
                <a href="/posts" className="hover:text-cyan-400">
                  Posts
                </a>
                <a href="/labs" className="hover:text-cyan-400">
                  Labs
                </a>
                <a href="/projects" className="hover:text-cyan-400">
                  Projects
                </a>
                <a href="/videos" className="hover:text-cyan-400">
                  Videos
                </a>
                <a href="/contacts" className="hover:text-cyan-400">
                  Contacts
                </a>
              </div>
            </nav>
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
