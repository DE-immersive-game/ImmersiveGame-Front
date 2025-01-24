'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { Team } from '@/app/types';

interface ResetGameHandlerProps {
  team: Team;
}

const ResetGameHandler: React.FC<ResetGameHandlerProps> = ({ team }) => {
  const router = useRouter();
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();

  useEffect(() => {
    const handleResetGame = () => {
      console.log(`Reset game event received for team: ${team}`);
      router.push(`/${team}/loading`);
    };

    registerEventHandler('resetGame', handleResetGame);

    return () => {
      unregisterEventHandler('resetGame', handleResetGame);
    };
  }, [team, router, registerEventHandler, unregisterEventHandler]);

  return null;
};

export default ResetGameHandler;
