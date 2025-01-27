'use client';

import CountdownScreen from '@/app/components/countdown/Countdown';
import ResetGameHandler from '@/app/components/resetGameHandler/ResetGameHandler';
import Score from '@/app/components/score/Score';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function GamePage() {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const router = useRouter();
  const handleTeamScore = (data: { team_a: number; team_b: number; result: string }) => {
    router.push('winner');
  };
  const [counter, setCounter] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    // Enregistrer les gestionnaires d'événements WebSocket
    registerEventHandler('teamScore', handleTeamScore);

    return () => {
      unregisterEventHandler('teamScore', handleTeamScore);
    };
  }, [registerEventHandler, unregisterEventHandler, router]);

  const [showCountdown, setShowCountdown] = useState(true);

  return (
    <div>
      {showCountdown ? (
        <CountdownScreen
          onComplete={() => setShowCountdown(false)}
          counter={counter}
          duration={duration}
        />
      ) : (
        <Score />
      )}
      <ResetGameHandler />
    </div>
  );
}
