'use client';

import './globals.css';
import { WebSocketProvider } from './context/WebSocketUsage';
import { usePathname } from 'next/navigation';
import { Team } from './types';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();


  const team = pathname.includes(Team.TEAM_A) ? Team.TEAM_A : Team.TEAM_B;

  return (
    <html lang="en">
      <body className="overflow-hidden bg-[#020108]">
        <WebSocketProvider currentTeam={team}>{children}</WebSocketProvider>
      </body>
    </html>
  );
}
