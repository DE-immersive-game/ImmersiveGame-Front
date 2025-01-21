
const WEBSOCKET_URL = 'ws://10.14.72.238:8000/admin';

let socket: WebSocket | null = null;

export const connectWebSocket = (onMessage: (message: MessageEvent) => void) => {
  socket = new WebSocket(WEBSOCKET_URL);

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onmessage = (event) => {
    console.log('WebSocket message received:', event.data);
    onMessage(event);
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return socket;
};

export const sendWebSocketMessage = (message: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.warn('WebSocket is not connected');
  }
};
