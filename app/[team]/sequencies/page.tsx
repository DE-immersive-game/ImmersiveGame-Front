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

  const getSequence = (data: { team: Team; sequence: { id: number; pressed: false }[] }) => {
    console.log(data);
    if (data.team === team) {
      setSequence(data.sequence);
    }
  };

  const getCurrentScore = (data: { team: Team; score: number }) => {
    console.log(data);
  };

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

  useEffect(() => {
    registerEventHandler('sendSequence', getSequence);
    registerEventHandler('teamScore', handleTeamScore);
    registerEventHandler('currentScore', getCurrentScore);

    return () => {
      unregisterEventHandler('sendSequence', getSequence);
      unregisterEventHandler('teamScore', handleTeamScore);
      unregisterEventHandler('currentScore', getCurrentScore);
    };
  }, [registerEventHandler, unregisterEventHandler, router, team]);

  return (
    <div>
      <Sequencies team={team} />
    </div>
  );
}
