'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWebSocket } from '../context/WebSocketContext';

const TeamPage = () => {
  const params = useParams();
  const router = useRouter();

  // Vérifiez que "params" et "params.team" sont définis
  const currentTeam = params?.team ? String(params.team) : null;

  const { isConnected, messages } = useWebSocket();

  return (
    <div>
      <h1>Team: {currentTeam}</h1>
      <p>{isConnected ? 'Connected to WebSocket' : 'Not connected to WebSocket'}</p>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPage;
