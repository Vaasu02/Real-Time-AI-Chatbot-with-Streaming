'use client';

import { useReducer, useCallback, useEffect } from 'react';
import { ChatState, ChatAction, Message, MessageRole } from '@/types/chat.types';
import { loadMessagesFromStorage, saveMessagesToStorage, clearMessagesFromStorage } from '@/utils/storage';

// Load initial state from localStorage
const getInitialState = (): ChatState => {
  if (typeof window === 'undefined') {
    return {
      messages: [],
      isConnected: false,
      isStreaming: false,
      error: null,
    };
  }

  const savedMessages = loadMessagesFromStorage();
  return {
    messages: savedMessages,
    isConnected: false,
    isStreaming: false,
    error: null,
  };
};

const initialState: ChatState = getInitialState();

// Reducer function
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };

    case 'UPDATE_STREAMING_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? {
                ...msg,
                content: msg.content + action.payload.chunk,
                isStreaming: true,
              }
            : msg
        ),
      };

    case 'COMPLETE_STREAMING':
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? { ...msg, isStreaming: false }
            : msg
        ),
        isStreaming: false,
      };

    case 'SET_CONNECTION_STATUS':
      return {
        ...state,
        isConnected: action.payload === 'connected',
        error: action.payload === 'error' ? 'Connection error' : null,
      };

    case 'SET_STREAMING':
      return {
        ...state,
        isStreaming: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isStreaming: false,
      };

    case 'CLEAR_CHAT':
      return {
        ...state,
        messages: [],
        error: null,
        isStreaming: false,
      };

    default:
      return state;
  }
}

//Custom hook for chat state management
export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  //Saving messages to localStorage whenever they change
  useEffect(() => {
    if (state.messages.length > 0) {
      saveMessagesToStorage(state.messages);
    }
  }, [state.messages]);

  const addMessage = useCallback((role: MessageRole, content: string) => {
    const message: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      isStreaming: role === 'assistant',
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    return message.id;
  }, []);

  const updateStreamingMessage = useCallback((id: string, chunk: string) => {
    dispatch({ type: 'UPDATE_STREAMING_MESSAGE', payload: { id, chunk } });
  }, []);

  const completeStreaming = useCallback((id: string) => {
    dispatch({ type: 'COMPLETE_STREAMING', payload: { id } });
  }, []);

  const setConnectionStatus = useCallback((status: 'connecting' | 'connected' | 'disconnected' | 'error') => {
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: status });
  }, []);

  const setStreaming = useCallback((isStreaming: boolean) => {
    dispatch({ type: 'SET_STREAMING', payload: isStreaming });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' });
    clearMessagesFromStorage();
  }, []);

  return {
    ...state,
    addMessage,
    updateStreamingMessage,
    completeStreaming,
    setConnectionStatus,
    setStreaming,
    setError,
    clearChat,
  };
}

