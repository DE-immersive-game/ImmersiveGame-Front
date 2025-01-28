'use client';

import CountdownScreen from '@/app/components/countdown/Countdown';
import ResetGameHandler from '@/app/components/resetGameHandler/ResetGameHandler';
import TvScore from '@/app/components/tvScore/TvScore';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { CurrentScore, TimerType } from '@/app/types';
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

  const handleTimerStarted = (message: TimerType) => {
    if (message?.counter !== undefined && message?.duration !== undefined) {
      setCounter(message.counter);
      setDuration(message.duration);
      // console.log('Counter reçu :', message.counter);
    } else {
      console.error('Données manquantes ou mal formatées dans le message :', message);
    }
  };

  const handleTeamScore = (data: CurrentScore) => {
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
        <TvScore score={score} counter={counter} />
      )}
      <ResetGameHandler />
    </div>
  );
}
