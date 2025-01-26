'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import CountdownScreen from '@/app/components/countdown/Countdown';
import Sequencies from '@/app/components/sequencies/Sequencies';
import { Team, TimerType } from '@/app/types';

const Game = () => {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const router = useRouter();
  const params = useParams();
  const team = (typeof params.team === 'string' ? params.team : '') as Team;
  const [counter, setCounter] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  // Démarrer le timer lorsque l'événement `timerStarted` est reçu
  useEffect(() => {
    const handleTimerStarted = (message: TimerType) => {
      if (message?.counter !== undefined && message?.duration !== undefined) {
        setCounter(message.counter);
        setDuration(message.duration);
        console.log('Counter reçu :', message.counter);
      } else {
        console.error('Données manquantes ou mal formatées dans le message :', message);
      }
    };

    // Enregistre les écouteurs pour les événements WebSocket
    registerEventHandler('timer', handleTimerStarted);

    return () => {
      unregisterEventHandler('timer', handleTimerStarted);
    };
  }, [registerEventHandler, unregisterEventHandler]);

  const [sequence, setSequence] = useState<
    { id: number; pressed: boolean; success?: boolean; error?: boolean }[]
  >([]);
  const [showCountdown, setShowCountdown] = useState(true);

  if (![Team.TEAM_A, Team.TEAM_B].includes(team)) {
    return <div className="text-center text-white text-3xl">Équipe invalide ou non trouvée</div>;
  }

  // Gestion des événements WebSocket
  const getSequence = (data: { team: Team; sequence: { id: number; pressed: boolean }[] }) => {
    if (data.team === team) {
      setSequence(
        data.sequence.map((item) => ({
          ...item,
          success: false,
          error: false,
        })),
      );
    }
  };

  const getCurrentScore = (data: { team: Team; score: number }) => {
    console.log('Score actuel :', data);
  };

  const handleTeamStatus = (data: { buttonInfo: any; status: string }) => {
    const { buttonInfo, status } = data;

    if (buttonInfo.team === team && status === 'success') {
      setSequence((prevSequence) =>
        prevSequence.map((button, index) => ({
          ...button,
          success: index + 1 <= buttonInfo.length,
        })),
      );
    }
    if (buttonInfo.team === team && status === 'error') {
      setSequence((prevSequence) =>
        prevSequence.map((button, index) => ({
          ...button,
          success: false,
          error: index + 1 <= buttonInfo.length,
        })),
      );

      // Réinitialiser l'état `error` après une seconde
      setTimeout(() => {
        setSequence((prevSequence) =>
          prevSequence.map((button) => ({
            ...button,
            error: false,
          })),
        );
      }, 1000);
    }
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
    // Enregistrer les gestionnaires d'événements WebSocket
    registerEventHandler('sendSequence', getSequence);
    registerEventHandler('teamScore', handleTeamScore);
    registerEventHandler('currentScore', getCurrentScore);
    registerEventHandler('teamStatus', handleTeamStatus);

    return () => {
      // Nettoyer les gestionnaires d'événements WebSocket
      unregisterEventHandler('sendSequence', getSequence);
      unregisterEventHandler('teamScore', handleTeamScore);
      unregisterEventHandler('currentScore', getCurrentScore);
      unregisterEventHandler('teamStatus', handleTeamStatus);
    };
  }, [registerEventHandler, unregisterEventHandler, router, team]);

  return (
    <main>
      {showCountdown ? (
        <CountdownScreen
          team={team}
          onComplete={() => setShowCountdown(false)}
          counter={counter}
          duration={duration}
        />
      ) : (
        <Sequencies team={team} sequence={sequence} counter={counter} />
      )}
    </main>
  );
};

export default Game;
