// Message types
export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// Socket.io message types
export type SocketMessageType = 'user_message' | 'ai_chunk' | 'ai_complete' | 'error';

export interface SocketMessage {
  type: SocketMessageType;
  data: any;
}

// Chat state
export interface ChatState {
  messages: Message[];
  isConnected: boolean;
  isStreaming: boolean;
  error: string | null;
}

// Connection status
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

// Chat actions
export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_STREAMING_MESSAGE'; payload: { id: string; chunk: string } }
  | { type: 'COMPLETE_STREAMING'; payload: { id: string } }
  | { type: 'SET_CONNECTION_STATUS'; payload: ConnectionStatus }
  | { type: 'SET_STREAMING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CHAT' };

