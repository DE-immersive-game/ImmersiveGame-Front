'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import WaitingSpectatorsScreen from '@/app/components/waitingSpectators/WaitingSpectators';

const WaitingPage = () => {
  const router = useRouter();
  const { waitingState, setWaitingState, registerEventHandler, unregisterEventHandler } =
    useWebSocket();

  useEffect(() => {
    const handleStartGame = () => {
      console.log('Start game event received');
      setWaitingState('starting');
      const timeoutId = setTimeout(() => {
        router.push(`/spectators/game`);
      }, 1000);

      return () => clearTimeout(timeoutId); // Nettoie le timeout
    };

    registerEventHandler('startGame', handleStartGame);

    return () => {
      unregisterEventHandler('startGame', handleStartGame);
    };
  }, [router, setWaitingState, registerEventHandler, unregisterEventHandler]);

  return <WaitingSpectatorsScreen state={waitingState} />;
};

export default WaitingPage;
