'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWebSocket } from '../context/WebSocketContext';

const TeamPage = () => {
  const params = useParams();
  const router = useRouter();

  // Vérifiez que "params" et "params.team" sont définis
  const currentTeam = params?.team ? String(params.team) : null;

  const { isConnected, messages } = useWebSocket();

  useEffect(() => {
    if (!currentTeam) {
      console.error('No team parameter found in the URL');
      return; // Ne rien faire si "currentTeam" est null
    }

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      try {
        const parsedMessage = JSON.parse(lastMessage);

        // Redirige si l'événement correspond à "win" ou "lose"
        if (parsedMessage.event && parsedMessage.data?.team) {
          const messageTeam = parsedMessage.data.team;
          const eventType = parsedMessage.event;

          if (messageTeam === currentTeam) {
            router.push(`/${currentTeam}/${eventType}`);
          } else {
            router.push(`/${currentTeam}/lose`);
          }
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    }
  }, [messages, currentTeam, router]);

  if (!currentTeam) {
    return <div>Error: No team selected</div>; // Afficher un message d'erreur si "team" est manquant
  }

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
