'use client';

import { useEffect } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const { isConnected, messages, sendMessage } = useWebSocket();
  const router = useRouter();

  useEffect(() => {

    const lastMessage = messages[messages.length - 1];
    if (lastMessage === 'win') {
      router.push('/win'); 
    }
  }, [messages, router]); 

  const handleSendMessage = () => {
    sendMessage('Hello from Admin!');
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <p>{isConnected ? 'Connected to WebSocket' : 'Not connected to WebSocket'}</p>
      <button onClick={handleSendMessage}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
