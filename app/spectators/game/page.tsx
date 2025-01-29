'use client';

import CountdownScreen from '@/app/components/countdown/Countdown';
import ResetGameHandler from '@/app/components/resetGameHandler/ResetGameHandler';
import SpectatorsScore from '@/app/components/spectatorsScore/SpectatorsScore';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { CurrentScore, Timer } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function GamePage() {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const router = useRouter();
  const [counter, setCounter] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const [score, setScore] = useState<CurrentScore>({
    team_a: 0,
    team_b: 0,
  });

  const getCurrentScore = (data: CurrentScore) => {
    setScore({
      team_a: data.team_a,
      team_b: data.team_b,
    });
  };

  const handleTimerStarted = (message: Timer) => {
    if (message?.counter !== undefined && message?.duration !== undefined) {
      setCounter(message.counter);
      setDuration(message.duration);
    } else {
      console.error('Données manquantes ou mal formatées dans le message :', message);
    }
  };

  const handleTeamScore = () => {
    router.push('winner');
  };

  useEffect(() => {
    // Enregistrer les gestionnaires d'événements WebSocket
    registerEventHandler('teamScore', handleTeamScore);
    registerEventHandler('currentScore', getCurrentScore);
    registerEventHandler('timer', handleTimerStarted);

    return () => {
      unregisterEventHandler('teamScore', handleTeamScore);
      unregisterEventHandler('currentScore', getCurrentScore);
      unregisterEventHandler('timer', handleTimerStarted);
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
        <SpectatorsScore score={score} counter={counter} />
      )}
      <ResetGameHandler />
    </div>
  );
}
