'use client';

import { useParams } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketContext';
import LoadingScreen from '@/app/components/loading/Loading';
import { Team } from '@/app/types';

const LoadingPage = () => {
  const params = useParams();
  const team = (typeof params.team === 'string' ? params.team : '') as Team;
  const { loadingState } = useWebSocket();

  if (![Team.TEAM_A, Team.TEAM_B].includes(team)) {
    return <div>Équipe invalide ou non trouvée</div>;
  }

  return <LoadingScreen team={team as Team} state={loadingState} />;
};

export default LoadingPage;
