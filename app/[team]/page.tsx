'use client';

import { useParams } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';

const TeamPage = () => {
  const params = useParams();
  const currentTeam = params?.team ? String(params.team) : null;
  const { isConnected } = useWebSocket();

  return (
    <div>
      <h1>Team: {currentTeam}</h1>
      <p>{isConnected ? 'Connected to WebSocket' : 'Not connected to WebSocket'}</p>
    </div>
  );
};

export default TeamPage;
