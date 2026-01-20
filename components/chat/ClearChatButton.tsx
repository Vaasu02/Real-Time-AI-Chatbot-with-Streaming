'use client';

interface ClearChatButtonProps {
  onClear: () => void;
  disabled?: boolean;
}

export default function ClearChatButton({ onClear, disabled }: ClearChatButtonProps) {
  const handleClick = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      onClear();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      title="Clear chat"
    >
      Clear
    </button>
  );
}

