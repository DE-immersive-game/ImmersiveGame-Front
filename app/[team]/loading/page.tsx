'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import LoadingScreen from '@/app/components/loading/Loading';
import { Team } from '@/app/types';

const LoadingPage = () => {
  const params = useParams();
  const router = useRouter();
  const team = (typeof params.team === 'string' ? params.team : '') as Team;
  const {
    isConnected,
    loadingState,
    setLoadingState,
    registerEventHandler,
    unregisterEventHandler,
  } = useWebSocket();

  useEffect(() => {
    const handleStartGame = () => {
      console.log('Start game event received');
      setLoadingState('starting');
      const timeoutId = setTimeout(() => {
        router.push(`/${team}/countdown`);
      }, 1000);

      return () => clearTimeout(timeoutId); // Nettoie le timeout
    };

    registerEventHandler('startGame', handleStartGame);

    return () => {
      unregisterEventHandler('startGame', handleStartGame);
    };
  }, [team, router, setLoadingState, registerEventHandler, unregisterEventHandler]);

  return <LoadingScreen team={team} state={loadingState} />;
};

export default LoadingPage;
