'use client';

import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { WebSocketMessage, WebSocketEvent } from '../types';

const AdminPage: React.FC = () => {
  const { isConnected, messages, sendMessage } = useWebSocket();

  // Fonction générique pour envoyer un événement WebSocket
  const handleSendEvent = (event: WebSocketEvent, data: Record<string, any> = {}) => {
    const message: WebSocketMessage = {
      event,
      data,
    };
    sendMessage(message);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <p>{isConnected ? 'Connected to WebSocket' : 'Not connected to WebSocket'}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <button onClick={() => handleSendEvent('loadindLight')} disabled={!isConnected}>
          Send "loadingLight" Event
        </button>
        <button onClick={() => handleSendEvent('startGame')} disabled={!isConnected}>
          Start
        </button>
        <button onClick={() => handleSendEvent('resetGame')} disabled={!isConnected}>
          Reset
        </button>
        <button onClick={() => handleSendEvent('pauseGame')} disabled={!isConnected}>
          Pause
        </button>
      </div>
      <h2>Messages Received:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
