import React, { useState, useMemo } from 'react';
import { formatNoteDate } from '../models/Note.js';
import { useEffects } from '../hooks/useEffects.js';

const FILTER_TAGS = ['All', 'Strategy', 'Clients', 'Product', 'Finance', 'Design', 'Engineering', 'Personal'];

export default function NotesScreen({ notes, onNavigate }) {
  const { trigger } = useEffects();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        !query.trim() ||
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase()) ||
        note.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesFilter = activeFilter === 'All' || note.tags.includes(activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [notes, query, activeFilter]);

  return (
    <div>
      <div className="screen-header">
        <h2>All Notes</h2>
        <div className="subtitle">{filtered.length} notes</div>
      </div>

      <div className="search-bar">
        <span className="icon">⌕</span>
        <input
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="filter-row">
        {FILTER_TAGS.map((tag) => (
          <span
            key={tag}
            className={`chip ${activeFilter === tag ? 'active' : ''}`}
            onClick={(e) => {
              trigger(e, { haptic: 'light', particles: 'sparkle', particleCount: 5 });
              setActiveFilter(tag);
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">✎</div>
          <h3>No notes found</h3>
          <p>Try a different search or filter</p>
        </div>
      ) : (
        <div className="notes-grid">
          {filtered.map((note) => (
            <div key={note.id} className="note-card" onClick={(e) => {
              trigger(e, { haptic: 'light', particles: 'sparkle', particleCount: 6 });
            }}>
              <div className="accent-line" />
              <div className="card-body">
                <div className="card-header">
                  <span className="card-title">{note.title}</span>
                  {note.hasCalc && <span className="card-indicator">fx</span>}
                  {note.hasPhoto && <span className="card-indicator">◉</span>}
                </div>
                <div className="card-excerpt">{note.excerpt}</div>
                <div className="card-footer">
                  <span className="card-date">{formatNoteDate(note.createdAt)}</span>
                  <div className="card-tags">
                    {note.tags.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
