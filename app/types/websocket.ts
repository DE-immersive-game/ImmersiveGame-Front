export enum Team {
  TEAM_A = "team_a",
  TEAM_B = "team_b",
}

export type WebSocketEvent =
  | "start"
  | "win"
  | "lose"
  | "update"
  | "countdown"
  | "test"
  | "loadindLight"
  | "startGame"
  | "resetGame"
  | "pauseGame"
  | "waitingForPlayers";

export type Score = {
  team_a: number;
  team_b: number;
  winner: Team;
};

export type ScoreResult = "win" | "lose";

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
