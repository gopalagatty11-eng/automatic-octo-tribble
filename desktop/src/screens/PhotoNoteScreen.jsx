import React, { useState, useRef } from 'react';
import { useEffects } from '../hooks/useEffects.js';

const QUICK_TAGS = ['Receipt', 'Document', 'Whiteboard', 'Screenshot'];

export default function PhotoNoteScreen({ onNavigate, onSave }) {
  const { trigger } = useEffects();
  const [caption, setCaption] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleCapture = (e) => {
    trigger(e, { haptic: 'medium', particles: 'burst', particleCount: 24 });
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      trigger(e, { haptic: 'success', particles: 'celebration', particleCount: 20 });
    }
  };

  const handleSave = async (e) => {
    trigger(e, { haptic: 'success', particles: 'celebration', particleCount: 40 });
    setSaved(true);
    setTimeout(() => setSaved(false), 600);
    await onSave({
      title: caption.trim() || 'Photo Note',
      content: caption.trim() || 'Photo captured',
      date: new Date().toLocaleString(),
      tags: selectedTag ? [selectedTag] : [],
      hasPhoto: true,
      hasCalc: false,
    });
    setTimeout(() => onNavigate('notes'), 300);
  };

  return (
    <div>
      <div className="screen-header">
        <h2>Photo Note</h2>
      </div>

      <div className="editor-layout">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Photo area */}
        {photoUrl ? (
          <div className="photo-preview" onClick={handleCapture}>
            <img src={photoUrl} alt="Captured photo" />
            <div className="retake-overlay">
              <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 500 }}>Click to retake</span>
            </div>
          </div>
        ) : (
          <div className="photo-capture-area" onClick={handleCapture}>
            <div className="capture-ring">
              <div className="inner" />
            </div>
            <div className="capture-label">Click to select a photo</div>
          </div>
        )}

        {/* Caption */}
        <div className="field-group">
          <div className="field-label">Caption</div>
          <textarea
            className="caption-input"
            placeholder="Add a note about this photo..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* Quick tags */}
        <div className="field-group">
          <div className="field-label">Quick Tags</div>
          <div className="tag-selector">
            {QUICK_TAGS.map((tag) => (
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

        <button
          className={`btn btn-primary ${saved ? 'save-success-glow' : ''}`}
          onClick={handleSave}
        >
          Save Photo Note
        </button>
      </div>
    </div>
  );
}
