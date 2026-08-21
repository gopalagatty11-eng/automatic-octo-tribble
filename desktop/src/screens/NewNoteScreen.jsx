import React, { useState, useRef } from 'react';
import { useEffects } from '../hooks/useEffects.js';

const TAGS = ['Strategy', 'Clients', 'Product', 'Finance', 'Personal'];

export default function NewNoteScreen({ onNavigate, onSave }) {
  const { trigger, spawnParticles } = useEffects();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    if (!title.trim()) return;
    trigger(e, { haptic: 'success', particles: 'celebration', particleCount: 40 });
    setSaved(true);
    setTimeout(() => setSaved(false), 600);
    await onSave({
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleString(),
      tags: selectedTag ? [selectedTag] : [],
      hasPhoto: false,
      hasCalc: false,
    });
    setTimeout(() => onNavigate('notes'), 300);
  };

  return (
    <div>
      <div className="screen-header">
        <h2>New Note</h2>
      </div>

      <div className="editor-layout">
        <div className="field-group">
          <input
            className="title-input"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="field-group">
          <div className="field-label">Tags</div>
          <div className="tag-selector">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className={`tag-option ${selectedTag === tag ? 'active' : ''}`}
                onClick={(e) => {
                  trigger(e, { haptic: 'light', particles: 'sparkle', particleCount: 5 });
                  setSelectedTag(selectedTag === tag ? null : tag);
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="field-group">
          <div className="field-label">Content</div>
          <textarea
            className="content-editor"
            placeholder="Start writing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="attach-row">
          <button className="attach-btn" onClick={(e) => {
            trigger(e, { haptic: 'light', particles: 'shimmer', particleCount: 8 });
            onNavigate('photo-note');
          }}>
            <span className="ai">◉</span> Photo
          </button>
          <button className="attach-btn" onClick={(e) => {
            trigger(e, { haptic: 'light', particles: 'shimmer', particleCount: 8 });
            onNavigate('calculator');
          }}>
            <span className="ai">fx</span> Calculator
          </button>
        </div>

        <button
          className={`btn btn-primary ${saved ? 'save-success-glow' : ''}`}
          onClick={handleSave}
          disabled={!title.trim()}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
