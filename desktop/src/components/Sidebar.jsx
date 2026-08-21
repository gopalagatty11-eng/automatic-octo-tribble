import React from 'react';
import { useEffects } from '../hooks/useEffects.js';

const NAV_ITEMS = [
  { id: 'home', icon: '◆', label: 'Home' },
  { id: 'notes', icon: '📋', label: 'All Notes' },
  { id: 'new-note', icon: '✎', label: 'New Note' },
  { id: 'photo-note', icon: '◉', label: 'Photo Note' },
  { id: 'calculator', icon: 'fx', label: 'Calculator' },
];

export default function Sidebar({ activeScreen, onNavigate, notes }) {
  const { trigger } = useEffects();
  const totalPhotos = notes.filter((n) => n.hasPhoto).length;
  const totalCalcs = notes.filter((n) => n.hasCalc).length;

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <h1>AURUM</h1>
        <p>Premium Edition</p>
      </div>

      <div className="sidebar-section">Navigation</div>
      {NAV_ITEMS.map((item) => (
        <div
          key={item.id}
          className={`sidebar-item ${activeScreen === item.id ? 'active' : ''}`}
          onClick={(e) => {
            trigger(e, { haptic: 'light', particles: 'sparkle', particleCount: 8 });
            onNavigate(item.id);
          }}
        >
          <span className="icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}

      <div className="sidebar-stats">
        <div className="stat-row">
          <span className="label">Notes</span>
          <span className="value">{notes.length}</span>
        </div>
        <div className="stat-row">
          <span className="label">Photos</span>
          <span className="value">{totalPhotos}</span>
        </div>
        <div className="stat-row">
          <span className="label">Calcs</span>
          <span className="value">{totalCalcs}</span>
        </div>
      </div>
    </nav>
  );
}
