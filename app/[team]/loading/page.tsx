'use client';

import { useParams } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketContext';
import LoadingScreen from '@/app/components/loading/Loading';

const LoadingPage = () => {
  const params = useParams();
  const team = typeof params.team === 'string' ? params.team : '';
  const { loadingState } = useWebSocket();

  if (!['team_a', 'team_b'].includes(team)) {
    return <div>Équipe invalide ou non trouvée</div>;
  }

  return <LoadingScreen team={team as 'team_a' | 'team_b'} state={loadingState} />;
};

export default LoadingPage;
