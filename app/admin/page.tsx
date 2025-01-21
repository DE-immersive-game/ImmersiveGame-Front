'use client';

import { useWebSocket } from '../context/WebSocketContext';

const AdminPage = () => {
  const { isConnected, messages, sendMessage } = useWebSocket();

  const handleSendMessage = () => {
    sendMessage(JSON.stringify({ event: 'test', data: { message: 'Hello from Admin!' } }));
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
