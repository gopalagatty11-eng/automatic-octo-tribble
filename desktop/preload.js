/**
 * AURUM NOTE Desktop — Preload Script
 * Exposes safe IPC bridge to the renderer process
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aurum', {
  // Notes persistence
  notes: {
    getAll: () => ipcRenderer.invoke('notes:getAll'),
    save: (notes) => ipcRenderer.invoke('notes:save', notes),
  },
  // Settings
  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    save: (s) => ipcRenderer.invoke('settings:save', s),
  },
  // Window controls
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
  },
});
