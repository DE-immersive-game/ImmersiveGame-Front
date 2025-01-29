'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { Team } from '@/app/types';

interface ResetGameHandlerProps {
  team?: Team; // Rendre 'team' optionnel
}

const ResetGameHandler: React.FC<ResetGameHandlerProps> = ({ team }) => {
  const router = useRouter();
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();

  useEffect(() => {
    const handleResetGame = () => {
      console.log(`Reset game event received${team ? ` for team: ${team}` : ''}`);
      if (team) {
        router.push(`/${team}/waiting`);
      } else {
        router.push('waiting');
      }
    };

    registerEventHandler('resetGame', handleResetGame);

    return () => {
      unregisterEventHandler('resetGame', handleResetGame);
    };
  }, [team, router, registerEventHandler, unregisterEventHandler]);

  return null;
};

export default ResetGameHandler;
