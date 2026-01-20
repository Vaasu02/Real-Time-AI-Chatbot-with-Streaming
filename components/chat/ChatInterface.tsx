'use client';

import { useEffect, useCallback } from 'react';
import { useChat } from '@/hooks/useChat';
import { useSocket } from '@/hooks/useSocket';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ConnectionStatus from './ConnectionStatus';
import ClearChatButton from './ClearChatButton';

export default function ChatInterface() {
  const {
    messages,
    isConnected,
    isStreaming,
    error,
    addMessage,
    updateStreamingMessage,
    completeStreaming,
    setConnectionStatus,
    setStreaming,
    setError,
    clearChat,
  } = useChat();

  //Handling streaming chunks
  const handleChunk = useCallback(
    (chunk: string, messageId: string) => {
      updateStreamingMessage(messageId, chunk);
      setStreaming(true);
    },
    [updateStreamingMessage, setStreaming]
  );

  //Handling streaming completion
  const handleComplete = useCallback(
    (messageId: string) => {
      completeStreaming(messageId);
      setStreaming(false);
    },
    [completeStreaming, setStreaming]
  );

  //Handling errors
  const handleError = useCallback(
    (errorMessage: string, messageId: string) => {
      setError(errorMessage);
      setStreaming(false);
      // Mark the streaming message as complete even on error
      if (messageId) {
        completeStreaming(messageId);
      }
    },
    [setError, setStreaming, completeStreaming]
  );

  // Initialize Socket.io connection
  const { status, sendMessage } = useSocket({
    onChunk: handleChunk,
    onComplete: handleComplete,
    onError: handleError,
  });

  useEffect(() => {
    setConnectionStatus(status);
  }, [status, setConnectionStatus]);

  // Handle sending messages
  const handleSendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isStreaming || !isConnected) return;
      const userMessageId = addMessage('user', content);
      const aiMessageId = addMessage('assistant', '');
      setStreaming(true);

      // Send message via Socket.io
      const sent = sendMessage(content, aiMessageId);
      if (!sent) {
        setError('Failed to send message. Please check your connection.');
        setStreaming(false);
      }
    },
    [addMessage, sendMessage, isStreaming, isConnected, setStreaming, setError]
  );

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            AI Chatbot
          </h1>
          {messages.length > 0 && (
            <ClearChatButton onClear={clearChat} disabled={isStreaming} />
          )}
        </div>
        <ConnectionStatus status={status} />
      </div>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 px-4 py-2">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <MessageList messages={messages} isStreaming={isStreaming} />

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isStreaming || !isConnected}
      />
    </div>
  );
}

