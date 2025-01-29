'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import WaitingScreen from '@/app/components/waiting/Waiting';
import { Team } from '@/app/types';

const WaitingPage = () => {
  const params = useParams();
  const router = useRouter();
  const team = (typeof params.team === 'string' ? params.team : '') as Team;
  const { waitingState, setWaitingState, registerEventHandler, unregisterEventHandler } =
    useWebSocket();

  useEffect(() => {
    const handleStartGame = () => {
      console.log('Start game event received');
      setWaitingState('starting');
      const timeoutId = setTimeout(() => {
        router.push(`/${team}/game`);
      }, 1000);

      return () => clearTimeout(timeoutId); // Nettoie le timeout
    };

    registerEventHandler('startGame', handleStartGame);

    return () => {
      unregisterEventHandler('startGame', handleStartGame);
    };
  }, [team, router, setWaitingState, registerEventHandler, unregisterEventHandler]);

  return <WaitingScreen team={team} state={waitingState} />;
};

export default WaitingPage;
