'use client';

import './globals.css';
import { WebSocketProvider } from './context/WebSocketContext';
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Déterminez l'équipe en fonction du chemin d'URL

  const team = pathname.includes('team_a') ? 'team_a' : 'team_b';

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
