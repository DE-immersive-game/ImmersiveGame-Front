'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import LoadingTvScreen from '@/app/components/loading-tv/LoadingTv';

const LoadingPage = () => {
  const router = useRouter();
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
        router.push(`/tv/game`);
      }, 1000);

      return () => clearTimeout(timeoutId); // Nettoie le timeout
    };

    registerEventHandler('startGame', handleStartGame);

    return () => {
      unregisterEventHandler('startGame', handleStartGame);
    };
  }, [router, setLoadingState, registerEventHandler, unregisterEventHandler]);

  return <LoadingTvScreen state={loadingState} />;
};

export default LoadingPage;
