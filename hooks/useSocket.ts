'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { createSocketConnection, SocketEvents } from '@/utils/socket';
import { ConnectionStatus } from '@/types/chat.types';

interface UseSocketOptions {
  onChunk?: (chunk: string, messageId: string) => void;
  onComplete?: (messageId: string) => void;
  onError?: (error: string, messageId: string) => void;
}

//Custom hook for Socket.io connection management
export function useSocket(options: UseSocketOptions = {}) {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const socketRef = useRef<Socket | null>(null);
  const { onChunk, onComplete, onError } = options;

  //Initializing socket connection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setStatus('connecting');
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.on(SocketEvents.CONNECT, () => {
      console.log('Socket connected');
      setStatus('connected');
    });

    socket.on(SocketEvents.DISCONNECT, () => {
      console.log('Socket disconnected');
      setStatus('disconnected');
    });

    socket.on(SocketEvents.CONNECT_ERROR, (error) => {
      console.error('Socket connection error:', error);
      setStatus('error');
    });

    // Message events
    socket.on(SocketEvents.AI_CHUNK, (data: { chunk: string; messageId: string }) => {
      if (onChunk) {
        onChunk(data.chunk, data.messageId);
      }
    });

    socket.on(SocketEvents.AI_COMPLETE, (data: { messageId: string }) => {
      if (onComplete) {
        onComplete(data.messageId);
      }
    });

    socket.on(SocketEvents.ERROR, (data: { message: string; messageId: string }) => {
      if (onError) {
        onError(data.message, data.messageId);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [onChunk, onComplete, onError]);

  //Sending message function
  const sendMessage = useCallback((message: string, messageId: string) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(SocketEvents.USER_MESSAGE, {
        message,
        messageId,
      });
      return true;
    }
    return false;
  }, []);

  return {
    socket: socketRef.current,
    status,
    isConnected: status === 'connected',
    sendMessage,
  };
}

