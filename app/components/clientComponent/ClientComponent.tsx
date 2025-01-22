'use client';

import './globals.css';
import { WebSocketProvider } from '../../context/WebSocketContext';
import { usePathname } from 'next/navigation';

export default function ClientComponent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const team = pathname.includes('team_a') ? 'team_a' : 'team_b';

  return (
    <WebSocketProvider currentTeam={team}>
      {children}
    </WebSocketProvider>
  );
}