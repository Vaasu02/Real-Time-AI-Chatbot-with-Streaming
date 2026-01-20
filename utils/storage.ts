import { Message } from '@/types/chat.types';

const STORAGE_KEY = 'ai-chatbot-messages';

export function saveMessagesToStorage(messages: Message[]): void {
  try {
    // Convert Date objects to ISO strings for storage
    const messagesToStore = messages.map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToStore));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
}

//load messages from localStorage
export function loadMessagesFromStorage(): Message[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const messages = JSON.parse(stored);
    return messages.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch (error) {
    console.error('Error loading messages from localStorage:', error);
    return [];
  }
}

/**
 * Clear messages from localStorage
 */
export function clearMessagesFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing messages from localStorage:', error);
  }
}

