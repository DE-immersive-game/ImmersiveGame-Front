'use client';

import React from 'react';
import { useWebSocket } from '../context/WebSocketContext';

const AdminPage: React.FC = () => {
  const { isConnected, messages } = useWebSocket();

  return (
    <div>
      <h1>Admin Page</h1>
      <p>{isConnected ? 'Connected to WebSocket' : 'Not connected to WebSocket'}</p>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
