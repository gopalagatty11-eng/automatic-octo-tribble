/**
 * useNotes — React hook for CRUD + search backed by AsyncStorage
 * Provides notes state, loading flag, and mutation helpers
 */
import { useState, useEffect, useCallback } from 'react';
import { Note, NoteInput } from '../models';
import { StorageService } from '../services';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all notes on mount
  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      const all = await StorageService.getAllNotes();
      setNotes(all);
    } catch (e) {
      console.error('useNotes: load failed', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Add a note and refresh the list
  const addNote = useCallback(async (input: NoteInput): Promise<Note> => {
    const note = await StorageService.addNote(input);
    setNotes((prev) => [note, ...prev]);
    return note;
  }, []);

  // Update a note
  const updateNote = useCallback(async (id: string, updates: Partial<NoteInput>): Promise<Note | null> => {
    const updated = await StorageService.updateNote(id, updates);
    if (updated) {
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? updated : n)).sort((a, b) => b.updatedAt - a.updatedAt)
      );
    }
    return updated;
  }, []);

  // Delete a note
  const deleteNote = useCallback(async (id: string): Promise<boolean> => {
    const ok = await StorageService.deleteNote(id);
    if (ok) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
    return ok;
  }, []);

  // Search notes (client-side filter)
  const searchNotes = useCallback(
    (query: string): Note[] => {
      if (!query.trim()) return notes;
      const q = query.toLowerCase();
      return notes.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      );
    },
    [notes]
  );

  // Get notes filtered by tag
  const filterByTag = useCallback(
    (tag: string): Note[] => {
      if (tag === 'All') return notes;
      return notes.filter((n) => n.tags.includes(tag));
    },
    [notes]
  );

  return {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
    searchNotes,
    filterByTag,
    refresh: loadNotes,
  };
}
