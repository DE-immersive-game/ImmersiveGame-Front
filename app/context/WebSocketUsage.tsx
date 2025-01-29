'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  WebSocketMessage,
  WebSocketContextType,
  WebSocketProviderProps,
  WebSocketMessageWithTime,
  WebSocketEvent,
  Score,
} from '../types';

const WEBSOCKET_URL = 'ws://192.168.0.104:8000/admin';
const RECONNECTION_DELAY = 2000;

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [receivedMessages, setReceivedMessages] = useState<WebSocketMessageWithTime[]>([]);
  const [sentMessages, setSentMessages] = useState<WebSocketMessageWithTime[]>([]);
  const [waitingState, setWaitingState] = useState<string>('waiting');
  const [eventHandlers, setEventHandlers] = useState<
    Record<WebSocketEvent, ((data: any) => void)[]>
  >({} as any);
  const [lastTeamScore, setLastTeamScore] = useState<Score | null>(null);

  const reconnectionTimeoutId = useRef<NodeJS.Timeout>();

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

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    const handleMessage = (event: MessageEvent) => {
      try {
        const parsedMessage: WebSocketMessage = JSON.parse(event.data);
        const currentTime = new Date().toLocaleTimeString();

        setReceivedMessages((prev) => [
          ...prev,
          { message: JSON.stringify(parsedMessage), time: currentTime },
        ]);

        if (parsedMessage.event === 'resetGame') {
          setWaitingState('waiting');
        }

        const handlers = eventHandlers[parsedMessage.event] || [];
        handlers.forEach((handler) => handler(parsedMessage.data));
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');

      console.log(`Tentative de reconnexion`);
      
      // Nettoyer le timeout précédent si il existe
      if (reconnectionTimeoutId.current) {
        clearTimeout(reconnectionTimeoutId.current);
      }
      
      // Planifier la prochaine tentative
      reconnectionTimeoutId.current = setTimeout(() => {
        connectWebSocket();
      }, RECONNECTION_DELAY);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    ws.onmessage = handleMessage;

    setSocket(ws);

    return ws;
  }, [eventHandlers]);

  useEffect(() => {
    const ws = connectWebSocket();

    return () => {
      if (reconnectionTimeoutId.current) {
        clearTimeout(reconnectionTimeoutId.current);
      }
      ws.close();
    };
  }, [connectWebSocket]);

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
        waitingState,
        setWaitingState,
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