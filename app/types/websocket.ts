import { Dispatch, SetStateAction } from 'react';

export enum Team {
  TEAM_A = 'team_a',
  TEAM_B = 'team_b',
}

export type WebSocketEvent =
  | 'start'
  | 'win'
  | 'lose'
  | 'update'
  | 'countdown'
  | 'test'
  | 'loadindLight'
  | 'startGame'
  | 'resetGame';

export type Score = {
  team_a: number;
  team_b: number;
  winner: Team;
};

export type ScoreResult = 'win' | 'lose';

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

export interface WebSocketMessageWithTime {
  message: string;
  time: string;
}

export interface WebSocketContextType {
  isConnected: boolean;
  receivedMessages: WebSocketMessageWithTime[];
  sentMessages: WebSocketMessageWithTime[];
  sendMessage: (message: WebSocketMessage) => void;
  loadingState: string;
  setLoadingState: Dispatch<SetStateAction<string>>;
  registerEventHandler: (event: WebSocketEvent, handler: (data: any) => void) => void;
  unregisterEventHandler: (event: WebSocketEvent, handler: (data: any) => void) => void;
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
