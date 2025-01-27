'use client';

import Score from '@/app/components/score/Score';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function ScorePage() {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const router = useRouter();
  const handleTeamScore = (data: { team_a: number; team_b: number; result: string }) => {
    router.push('winner');
  };

  useEffect(() => {
    // Enregistrer les gestionnaires d'événements WebSocket
    registerEventHandler('teamScore', handleTeamScore);

    return () => {
      unregisterEventHandler('teamScore', handleTeamScore);
    };
  }, [registerEventHandler, unregisterEventHandler, router]);

  return <Score />;
}
