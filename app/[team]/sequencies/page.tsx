'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { Team } from '@/app/types';
import Sequencies from '@/app/components/sequencies/Sequencies';

export default function SequenciesPage() {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const router = useRouter();
  const params = useParams();
  const team = params.team as Team;

  // Validation de l'équipe (au cas où)
  if (!Object.values(Team).includes(team)) {
    return <div className="text-center text-white text-3xl">Équipe invalide !</div>;
  }

  useEffect(() => {
    const handleTeamScore = (data: { team_a: number; team_b: number; result: string }) => {
      const { result } = data;

      if (result === 'draw') {
        router.push(`/${team}/draw`);
      } else if (result === team) {
        router.push(`/${team}/win`);
      } else {
        router.push(`/${team === 'team_a' ? 'team_b' : 'team_a'}/win`);
        router.push(`/${team}/lose`);
      }
    };

    registerEventHandler('teamScore', handleTeamScore);

    return () => {
      unregisterEventHandler('teamScore', handleTeamScore);
    };
  }, [registerEventHandler, unregisterEventHandler, router, team]);

  return (
    <div>
      <Sequencies team={team} />
    </div>
  );
}
