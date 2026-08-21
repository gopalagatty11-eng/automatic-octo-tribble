/**
 * useNotes — React hook for CRUD + persistence
 * Uses Electron IPC when available, falls back to localStorage
 */
import { useState, useEffect, useCallback } from 'react';
import { createNote, SEED_NOTES } from '../models/Note.js';

const isElectron = typeof window !== 'undefined' && window.aurum?.notes;
const STORAGE_KEY = 'aurum_notes';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveToStorage(notes) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch {}
}

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load notes
  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (isElectron) {
        data = await window.aurum.notes.getAll();
      } else {
        data = loadFromStorage();
      }

      if (!data || data.length === 0) {
        // First launch — seed
        data = SEED_NOTES;
        if (isElectron) {
          await window.aurum.notes.save(data);
        } else {
          saveToStorage(data);
        }
      }

      setNotes(data.sort((a, b) => b.updatedAt - a.updatedAt));
    } catch (e) {
      console.error('useNotes: load failed', e);
      setNotes(SEED_NOTES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  // Persist helper
  const persist = useCallback(async (updated) => {
    if (isElectron) {
      await window.aurum.notes.save(updated);
    } else {
      saveToStorage(updated);
    }
  }, []);

  // Add
  const addNote = useCallback(async (input) => {
    const note = createNote(input);
    setNotes((prev) => {
      const next = [note, ...prev];
      persist(next);
      return next;
    });
    return note;
  }, [persist]);

  // Delete
  const deleteNote = useCallback(async (id) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      persist(next);
      return next;
    });
  }, [persist]);

  // Search (client-side)
  const searchNotes = useCallback((query) => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) ||
             n.content.toLowerCase().includes(q) ||
             n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [notes]);

  // Filter by tag
  const filterByTag = useCallback((tag) => {
    if (tag === 'All') return notes;
    return notes.filter((n) => n.tags.includes(tag));
  }, [notes]);

  return { notes, loading, addNote, deleteNote, searchNotes, filterByTag, refresh: loadNotes };
}
