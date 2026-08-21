/**
 * AURUM NOTE Desktop — Electron Main Process
 * Creates a frameless gold-accented window with dark glass aesthetic
 */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Persistent storage path
const DATA_DIR = path.join(app.getPath('userData'), 'aurum-data');
const NOTES_FILE = path.join(DATA_DIR, 'notes.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON(filepath, fallback) {
  try {
    if (fs.existsSync(filepath)) {
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
  } catch (e) {
    console.error(`Failed to read ${filepath}:`, e);
  }
  return fallback;
}

function writeJSON(filepath, data) {
  ensureDataDir();
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

// ── IPC Handlers ──────────────────────────────────────────
ipcMain.handle('notes:getAll', () => {
  return readJSON(NOTES_FILE, []);
});

ipcMain.handle('notes:save', (_event, notes) => {
  writeJSON(NOTES_FILE, notes);
  return true;
});

ipcMain.handle('settings:get', () => {
  return readJSON(SETTINGS_FILE, { onboardingDone: false });
});

ipcMain.handle('settings:save', (_event, settings) => {
  writeJSON(SETTINGS_FILE, settings);
  return true;
});

// ── Window Creation ───────────────────────────────────────
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 780,
    minWidth: 800,
    minHeight: 600,
    frame: false, // Frameless for custom title bar
    titleBarStyle: 'hidden',
    backgroundColor: '#0A0A0A',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, 'icon.png'),
  });

  // In dev, load from Vite dev server; in prod, load built files
  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ── Window Controls IPC ───────────────────────────────────
ipcMain.on('window:minimize', () => mainWindow?.minimize());
ipcMain.on('window:maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});
ipcMain.on('window:close', () => mainWindow?.close());

// ── App Lifecycle ─────────────────────────────────────────
app.whenReady().then(() => {
  ensureDataDir();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
