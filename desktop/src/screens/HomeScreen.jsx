import React from 'react';
import { formatNoteDate } from '../models/Note.js';
import { useEffects } from '../hooks/useEffects.js';

export default function HomeScreen({ notes, onNavigate }) {
  const { trigger } = useEffects();
  const recent = notes.slice(0, 4);
  const totalPhotos = notes.filter((n) => n.hasPhoto).length;
  const totalCalcs = notes.filter((n) => n.hasCalc).length;

  return (
    <div>
      <div className="screen-header">
        <h2>Good morning</h2>
        <div className="subtitle">AURUM NOTE — {notes.length} notes</div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'flex', gap: 12, padding: '20px 32px' }}>
        {[
          { value: notes.length, label: 'NOTES' },
          { value: totalPhotos, label: 'PHOTOS' },
          { value: totalCalcs, label: 'CALCS' },
        ].map(({ value, label }) => (
          <div key={label} style={{
            flex: 1, background: 'var(--dark-glass)', border: '1px solid var(--gold-border)',
            borderRadius: 12, padding: '16px 12px', textAlign: 'center', cursor: 'default'
          }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--gold)', marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {[
          { icon: '✎', label: 'New Note', screen: 'new-note' },
          { icon: '◉', label: 'Photo Note', screen: 'photo-note' },
          { icon: 'fx', label: 'Calculator', screen: 'calculator' },
        ].map(({ icon, label, screen }) => (
          <div key={screen} className="quick-action" onClick={(e) => {
            trigger(e, { haptic: 'medium', particles: 'burst', particleCount: 16 });
            onNavigate(screen);
          }}>
            <div className="icon">{icon}</div>
            <div className="label">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Notes */}
      <div className="screen-header" style={{ paddingBottom: 12 }}>
        <h2 style={{ fontSize: 14, letterSpacing: 2, color: 'var(--text-tertiary)' }}>RECENT NOTES</h2>
      </div>

      <div className="notes-grid">
        {recent.map((note) => (
          <div key={note.id} className="note-card" onClick={(e) => {
            trigger(e, { haptic: 'light', particles: 'sparkle', particleCount: 6 });
            onNavigate('notes');
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
    </div>
  );
}
