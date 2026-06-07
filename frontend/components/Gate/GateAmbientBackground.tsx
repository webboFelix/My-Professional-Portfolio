'use client';

import { NetworkGraph3D } from '@/components/Effects/NetworkGraph3D';
import { GateDashboardBackdrop } from './GateDashboardBackdrop';
import { HackerScene3D } from './HackerScene3D';
import { KaliTerminalLive } from './KaliTerminalLive';

/** Layered gate environment: 3D hacker, live Kali terminals, network + HUD widgets */
export function GateAmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0c]">
      <GateDashboardBackdrop dimmed />
      <div className="absolute inset-0 opacity-50">
        <NetworkGraph3D />
      </div>
      <HackerScene3D />

      {/* Live Kali terminals */}
      <KaliTerminalLive
        title="kali@terminal — recon"
        variant="nmap"
        className="absolute left-[2%] top-[22%] z-[2] hidden w-[min(280px,28vw)] md:block"
        lineDelayMs={380}
      />
      <KaliTerminalLive
        title="kali@terminal — exploit"
        variant="msf"
        className="absolute right-[2%] top-[20%] z-[2] hidden w-[min(280px,28vw)] lg:block"
        lineDelayMs={450}
      />
      <KaliTerminalLive
        title="kali@terminal — ops"
        variant="misc"
        className="absolute bottom-[14%] left-[2%] z-[2] hidden w-[min(260px,26vw)] lg:block"
        lineDelayMs={500}
      />
      <KaliTerminalLive
        title="kali@terminal"
        variant="nmap"
        className="absolute bottom-[12%] left-2 right-2 z-[2] mx-auto max-w-md md:hidden"
        lineDelayMs={400}
      />

      {/* Scanline overlay */}
      <div className="scanline absolute inset-0 z-[3] opacity-[0.04]" />
      <div className="absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0c_75%)]" />
    </div>
  );
}
