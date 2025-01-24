'use client';

import React from 'react';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { WebSocketMessage, WebSocketEvent } from '../types';

const AdminPage: React.FC = () => {
  const { isConnected, receivedMessages, sentMessages, sendMessage } = useWebSocket();

  const handleSendEvent = (event: WebSocketEvent, data: Record<string, any> = {}) => {
    const message: WebSocketMessage = { event, data };
    sendMessage(message);
  };

  return (
    <div className="text-neutral-text min-h-screen flex flex-col items-center">
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Actions:</h3>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSendEvent('startGame')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            disabled={!isConnected}
          >
            Start Game
          </button>
          <button
            onClick={() => handleSendEvent('resetGame')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            disabled={!isConnected}
          >
            Reset Game
          </button>
        </div>
      </div>
      <h1 className="text-2xl font-bold my-4">Admin Page</h1>
      <p className="mb-4">
        {isConnected ? 'Connected to WebSocket' : 'Not connected to WebSocket'}
      </p>

      <div className="flex flex-row w-full px-10">
        {/* Messages envoyés */}
        <div className="w-1/2 pr-4 border-r border-gray-400">
          <h2 className="text-xl font-semibold mb-2">Messages Sent:</h2>
          <ul className="space-y-2">
            {[...sentMessages].reverse().map((msg, index) => (
              <li key={index} className="p-2 bg-blue-100 text-blue-900 rounded-lg shadow-md">
                <div>{msg.message}</div>
                <div className="text-sm text-gray-600">Time: {msg.time}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Messages reçus */}
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-2">Messages Received:</h2>
          <ul className="space-y-2">
            {[...receivedMessages].reverse().map((msg, index) => (
              <li key={index} className="p-2 bg-green-100 text-green-900 rounded-lg shadow-md">
                <div>{msg.message}</div>
                <div className="text-sm text-gray-600">Time: {msg.time}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
