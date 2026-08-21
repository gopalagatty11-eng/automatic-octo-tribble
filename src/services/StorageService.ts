/**
 * StorageService — AsyncStorage wrapper for AURUM NOTE v2
 * Handles all CRUD operations for notes with JSON serialization
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, NoteInput, createNote, formatNoteDate } from '../models';

const STORAGE_KEYS = {
  NOTES: '@aurum_notes',
  SETTINGS: '@aurum_settings',
  ONBOARDING_DONE: '@aurum_onboarding_done',
} as const;

// ─── Seed Data ───────────────────────────────────────────────

const SEED_NOTES: Note[] = [
  {
    id: 'seed_1',
    title: 'Q3 Strategy Review',
    content: 'Key metrics from the quarterly review — revenue up 12%, churn down to 2.1%, NPS holding at 72. Need to focus on enterprise segment for Q4. Marketing budget should shift toward content and partnerships.',
    excerpt: 'Key metrics from the quarterly review — revenue up 12%, churn down to 2.1%, NPS holding at 72.',
    date: 'Today, 9:41 AM',
    tags: ['Strategy'],
    hasPhoto: false,
    hasCalc: true,
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 3600000,
  },
  {
    id: 'seed_2',
    title: 'Client Onboarding Notes',
    content: 'Meridian Corp kickoff — they want the premium tier, 50-seat license, SSO integration timeline. Decision maker is VP of Engineering. Follow up by Friday.',
    excerpt: 'Meridian Corp kickoff — they want the premium tier, 50-seat license, SSO integration timeline.',
    date: 'Yesterday',
    tags: ['Clients', 'Sales'],
    hasPhoto: true,
    hasCalc: false,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: 'seed_3',
    title: 'Product Roadmap v4',
    content: 'Phase 2 priorities: dark mode, offline sync, collaboration features. Deprioritize widget system. Target release mid-October. Need to finalize API spec by end of month.',
    excerpt: 'Phase 2 priorities: dark mode, offline sync, collaboration features. Deprioritize widget system.',
    date: 'Aug 19',
    tags: ['Product'],
    hasPhoto: false,
    hasCalc: false,
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 172800000,
  },
  {
    id: 'seed_4',
    title: 'Investor Deck Notes',
    content: 'Series B prep — key talking points: TAM expansion, unit economics improvement, team scaling plan. ARR at $4.2M, growing 8% MoM. Need to prep competitive landscape slide.',
    excerpt: 'Series B prep — key talking points: TAM expansion, unit economics improvement, team scaling plan.',
    date: 'Aug 18',
    tags: ['Finance'],
    hasPhoto: false,
    hasCalc: true,
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now() - 259200000,
  },
  {
    id: 'seed_5',
    title: 'Design System Audit',
    content: 'Current component library has 47 components, 12 are unused. Suggest consolidation and token migration. Gold accent colors need standardization across all surfaces.',
    excerpt: 'Current component library has 47 components, 12 are unused. Suggest consolidation and token migration.',
    date: 'Aug 16',
    tags: ['Design'],
    hasPhoto: false,
    hasCalc: false,
    createdAt: Date.now() - 432000000,
    updatedAt: Date.now() - 432000000,
  },
  {
    id: 'seed_6',
    title: 'Weekly Standup Summary',
    content: 'Backend migration on track. Frontend blocked on API changes. Mobile team starting beta testing next week. Deployment pipeline needs attention — CI failing on flaky tests.',
    excerpt: 'Backend migration on track. Frontend blocked on API changes. Mobile team starting beta testing next week.',
    date: 'Aug 15',
    tags: ['Engineering'],
    hasPhoto: false,
    hasCalc: false,
    createdAt: Date.now() - 518400000,
    updatedAt: Date.now() - 518400000,
  },
  {
    id: 'seed_7',
    title: 'Competitive Analysis',
    content: 'Notion, Obsidian, and Craft as primary competitors. Our advantage: offline-first, speed, and the premium aesthetic. Need to benchmark load times and feature parity.',
    excerpt: 'Notion, Obsidian, and Craft as primary competitors. Our advantage: offline-first, speed, and the premium aesthetic.',
    date: 'Aug 14',
    tags: ['Strategy'],
    hasPhoto: false,
    hasCalc: false,
    createdAt: Date.now() - 604800000,
    updatedAt: Date.now() - 604800000,
  },
];

// ─── Notes CRUD ──────────────────────────────────────────────

export async function getAllNotes(): Promise<Note[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.NOTES);
    if (!raw) {
      // First run — seed with default notes
      await AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(SEED_NOTES));
      return SEED_NOTES;
    }
    const notes: Note[] = JSON.parse(raw);
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (e) {
    console.error('Failed to load notes:', e);
    return SEED_NOTES;
  }
}

export async function getNoteById(id: string): Promise<Note | null> {
  const notes = await getAllNotes();
  return notes.find((n) => n.id === id) ?? null;
}

export async function addNote(input: NoteInput): Promise<Note> {
  const notes = await getAllNotes();
  const note = createNote(input);
  notes.unshift(note);
  await AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  return note;
}

export async function updateNote(id: string, updates: Partial<NoteInput>): Promise<Note | null> {
  const notes = await getAllNotes();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;

  const existing = notes[idx];
  const content = updates.content ?? existing.content;
  const updated: Note = {
    ...existing,
    ...updates,
    content,
    excerpt: content.slice(0, 120) + (content.length > 120 ? '...' : ''),
    updatedAt: Date.now(),
  };

  notes[idx] = updated;
  await AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  return updated;
}

export async function deleteNote(id: string): Promise<boolean> {
  const notes = await getAllNotes();
  const filtered = notes.filter((n) => n.id !== id);
  if (filtered.length === notes.length) return false;
  await AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(filtered));
  return true;
}

export async function searchNotes(query: string): Promise<Note[]> {
  const notes = await getAllNotes();
  if (!query.trim()) return notes;
  const q = query.toLowerCase();
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
  );
}

// ─── Settings ────────────────────────────────────────────────

export async function isOnboardingDone(): Promise<boolean> {
  try {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE);
    return val === 'true';
  } catch {
    return false;
  }
}

export async function setOnboardingDone(): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, 'true');
}
