import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/cyber-theme.css";
import { AppShell } from "@/components/Layout/AppShell";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { site } from "@/lib/site";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.title}`,
  description: site.tagline,
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} ${orbitron.variable}`}>
      <body className="font-mono overflow-x-hidden">
        <ReduxProvider>
          <AppShell>{children}</AppShell>
        </ReduxProvider>
      </body>
    </html>
  );
}
