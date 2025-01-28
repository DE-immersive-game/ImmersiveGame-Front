'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  WebSocketMessage,
  WebSocketContextType,
  WebSocketProviderProps,
  WebSocketMessageWithTime,
  WebSocketEvent,
  Score,
  Team,
} from '../types';

const WEBSOCKET_URL = 'ws://192.168.2.1:8000/admin';

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [receivedMessages, setReceivedMessages] = useState<WebSocketMessageWithTime[]>([]);
  const [sentMessages, setSentMessages] = useState<WebSocketMessageWithTime[]>([]);
  const [loadingState, setLoadingState] = useState<string>('waiting');
  const [eventHandlers, setEventHandlers] = useState<
    Record<WebSocketEvent, ((data: any) => void)[]>
  >({} as any);
  const [lastTeamScore, setLastTeamScore] = useState<Score | null>(null);
  const router = useRouter();

  const registerEventHandler = useCallback(
    (event: WebSocketEvent, handler: (data: any) => void) => {
      setEventHandlers((prev) => ({
        ...prev,
        [event]: [...(prev[event] || []), handler],
      }));
    },
    [],
  );

  const unregisterEventHandler = useCallback(
    (event: WebSocketEvent, handler: (data: any) => void) => {
      setEventHandlers((prev) => ({
        ...prev,
        [event]: (prev[event] || []).filter((h) => h !== handler),
      }));
    },
    [],
  );

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    const handleMessage = (event: MessageEvent) => {
      try {
        const parsedMessage: WebSocketMessage = JSON.parse(event.data);
        const currentTime = new Date().toLocaleTimeString();

        setReceivedMessages((prev) => [
          ...prev,
          { message: JSON.stringify(parsedMessage), time: currentTime },
        ]);

        const handlers = eventHandlers[parsedMessage.event] || [];
        handlers.forEach((handler) => handler(parsedMessage.data));
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onmessage = handleMessage;

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [eventHandlers]);

  const sendMessage = (message: WebSocketMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const currentTime = new Date().toLocaleTimeString();
      socket.send(JSON.stringify(message));
      setSentMessages((prev) => [...prev, { message: JSON.stringify(message), time: currentTime }]);
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        receivedMessages,
        sentMessages,
        sendMessage,
        loadingState,
        setLoadingState,
        registerEventHandler,
        unregisterEventHandler,
        lastTeamScore,
        setLastTeamScore: (score) => setLastTeamScore(score),
      }}
    >
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

export default WebSocketProvider;
