'use client';

import './globals.css';
import { WebSocketProvider } from './context/WebSocketContext';
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Déterminez l'équipe en fonction du chemin d'URL
  const team = pathname.includes('team_a') ? 'team_a' : pathname.includes('team_b') ? 'team_b' : 'default';

  return (
    <html lang="en">
      <body className='overflow-hidden'>
        <WebSocketProvider currentTeam={team}>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}
