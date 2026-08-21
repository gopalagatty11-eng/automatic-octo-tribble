/**
 * NotesProvider — React context for notes state across all Expo Router screens
 */
import React, { createContext, useContext } from 'react';
import { useNotes } from '../hooks/useNotes';
import { Note, NoteInput } from '../models';

interface NotesContextValue {
  notes: Note[];
  loading: boolean;
  addNote: (input: NoteInput) => Promise<Note>;
  deleteNote: (id: string) => Promise<boolean>;
  searchNotes: (query: string) => Note[];
  filterByTag: (tag: string) => Note[];
  refresh: () => Promise<void>;
}

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const notesState = useNotes();

  return (
    <NotesContext.Provider value={notesState}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext(): NotesContextValue {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error('useNotesContext must be used within a <NotesProvider>');
  }
  return ctx;
}
