"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  WebSocketMessage,
  WebSocketContextType,
  WebSocketProviderProps,
} from "../types";

const WEBSOCKET_URL = "ws://10.14.72.238:8000/admin";

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  currentTeam,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connected");
    };

    ws.onmessage = (event: MessageEvent) => {
      const message = event.data;
      try {
        const parsedMessage: WebSocketMessage = JSON.parse(message);
        const currentPath = window.location.pathname;
        const startExpectedPath = `/${currentTeam}/loading`;

        if (
          currentPath === startExpectedPath &&
          parsedMessage.event === "startGame"
        ) {
          console.log(
            'Événement "start" reçu, redirection avec "countdown"...'
          );
          router.push(`/${currentTeam}/countdown`);
        } else if (!parsedMessage.data) {
          setMessages((prev) => [...prev, message]);
        }

        if (parsedMessage.data?.team === currentTeam) {
          setMessages((prev) => [...prev, message]);

          if (parsedMessage.event) {
            const eventType = parsedMessage.event;
            router.push(`/${currentTeam}/${eventType}`);
          }
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [router, currentTeam]);

  const sendMessage = (message: WebSocketMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected");
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
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
