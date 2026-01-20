import { io, Socket } from 'socket.io-client';


export function createSocketConnection(): Socket {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || '';
  
  const url = socketUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  
  return io(url, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });
}

//event type
export const SocketEvents = {
  // Client to server
  USER_MESSAGE: 'user_message',
  
  // Server to client
  AI_CHUNK: 'ai_chunk',
  AI_COMPLETE: 'ai_complete',
  ERROR: 'error',
  
  // Connection events
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
} as const;

