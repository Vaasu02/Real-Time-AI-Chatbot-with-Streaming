import { format, formatDistanceToNow } from 'date-fns';


export function formatMessageTimestamp(date: Date): string {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  // If less than 24 hours, show relative time
  if (diffInHours < 24) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  return format(date, 'MMM d, yyyy h:mm a');
}

export function formatDetailedTimestamp(date: Date): string {
  return format(date, 'MMM d, yyyy h:mm:ss a');
}

