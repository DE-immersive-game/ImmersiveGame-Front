'use client'
import { useEffect, useState } from 'react';
import { connectWebSocket, sendWebSocketMessage } from '@/app/api/websocket';

const Admin = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    const socket = connectWebSocket(onMessage);

    // Nettoyage à la fin
    return () => {
      socket?.close();
    };
  }, []);

  const handleSendMessage = () => {
    const message = 'Hello from the front-end!';
    sendWebSocketMessage(message);
  };

  return (
    <div>
      <h1>Admin WebSocket</h1>
      <button onClick={handleSendMessage}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
