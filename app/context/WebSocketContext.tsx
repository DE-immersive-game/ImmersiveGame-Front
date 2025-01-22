'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const WEBSOCKET_URL = 'ws://10.14.72.238:8000/admin';

interface WebSocketContextType {
  isConnected: boolean;
  messages: string[];
  sendMessage: (message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode; currentTeam: string }> = ({ children, currentTeam }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      try {
        const parsedMessage = JSON.parse(message);
    
        // Si le message ne contient pas de "data", appliquez-le à toutes les équipes
        if (!parsedMessage.data) {
          setMessages((prev) => [...prev, message]);
    
          // Vérifiez si l'événement est "start" et redirigez avec "countdown"
          if (parsedMessage.event === 'start') {
            console.log('Événement "start" reçu, redirection avec "countdown"...');
            router.push(`/${currentTeam}/countdown`); // Redirige vers "countdown" pour toutes les équipes
          }
    
          return; // Stoppe ici pour éviter d'exécuter la suite pour ce type de message
        }
    
        // Vérifiez si le message concerne l'équipe actuelle
        if (parsedMessage.data?.team === currentTeam) {
          setMessages((prev) => [...prev, message]);
    
          // Redirection conditionnelle avec gestion de "start"
          const eventType = parsedMessage.event === 'start' ? 'countdown' : parsedMessage.event;
          router.push(`/${currentTeam}/${eventType}`); // Redirige dynamiquement
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
    
    

    

    ws.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [router, currentTeam]);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  return (
    <WebSocketContext.Provider value={{ isConnected, messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
