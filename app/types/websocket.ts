
export type Team = 'team_a' | 'team_b' | "default";

export type WebSocketEvent = 'start' | 'win' | 'lose' | 'update' | 'countdown' | 'test' | 'loadindLight'| 'startGame' | 'resetGame' | 'pauseGame' | 'waitingForPlayers';

export interface WebSocketData {
  team?: Team;
  id?: number;
  GPIO?: number;
  pressed?: boolean;
}

export interface WebSocketMessage {
  event: WebSocketEvent; 
  data?: WebSocketData; 
}

export interface WebSocketContextType {
  isConnected: boolean;
  messages: string[];
  sendMessage: (message: WebSocketMessage) => void;
  loadingState: string;
}

export interface WebSocketState {
  isConnected: boolean;
  messages: string[];
}

export interface WebSocketProviderProps {
  children: React.ReactNode;
  currentTeam: Team;
}

export type WebSocketMessageHandler = (event: MessageEvent) => void;
