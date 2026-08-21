import React from 'react';

// Check if running inside Electron
const isElectron = typeof window !== 'undefined' && window.aurum?.window;

export default function TitleBar() {
  const handleMin = () => isElectron && window.aurum.window.minimize();
  const handleMax = () => isElectron && window.aurum.window.maximize();
  const handleClose = () => isElectron && window.aurum.window.close();

  return (
    <div className="titlebar">
      <span className="titlebar-title">AURUM NOTE</span>
      <div className="titlebar-controls">
        <button className="titlebar-btn" onClick={handleMin} title="Minimize">─</button>
        <button className="titlebar-btn" onClick={handleMax} title="Maximize">☐</button>
        <button className="titlebar-btn close" onClick={handleClose} title="Close">✕</button>
      </div>
    </div>
  );
}
