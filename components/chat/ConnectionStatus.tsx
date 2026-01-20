'use client';

import { ConnectionStatus as ConnectionStatusType } from '@/types/chat.types';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
}

export default function ConnectionStatus({ status }: ConnectionStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'bg-green-500',
          text: 'Connected',
          textColor: 'text-green-600 dark:text-green-400',
        };
      case 'connecting':
        return {
          color: 'bg-yellow-500',
          text: 'Connecting...',
          textColor: 'text-yellow-600 dark:text-yellow-400',
        };
      case 'error':
        return {
          color: 'bg-red-500',
          text: 'Connection Error',
          textColor: 'text-red-600 dark:text-red-400',
        };
      default:
        return {
          color: 'bg-gray-400',
          text: 'Disconnected',
          textColor: 'text-gray-600 dark:text-gray-400',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center space-x-2 px-4 py-2">
      <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`} />
      <span className={`text-sm font-medium ${config.textColor}`}>
        {config.text}
      </span>
    </div>
  );
}

