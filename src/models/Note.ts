/**
 * Note — Core data model for AURUM NOTE v2
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
  hasPhoto: boolean;
  hasCalc: boolean;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

export type NoteInput = Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'excerpt'>;

/**
 * Generate a simple unique ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/**
 * Create a Note from user input
 */
export function createNote(input: NoteInput): Note {
  const now = Date.now();
  return {
    ...input,
    id: generateId(),
    excerpt: input.content.slice(0, 120) + (input.content.length > 120 ? '...' : ''),
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Format a timestamp for display
 */
export function formatNoteDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - ts;

  // Less than 24h
  if (diff < 86400000) {
    const hours = d.getHours();
    const mins = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `Today, ${h}:${mins} ${ampm}`;
  }

  // Less than 7 days
  if (diff < 604800000) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[d.getDay()];
  }

  // Otherwise
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}
