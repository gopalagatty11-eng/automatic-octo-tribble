/**
 * AURUM NOTE Desktop — Root App
 * Manages splash → app transition, sidebar navigation, and screen routing
 */
import React, { useState, useEffect, useCallback } from 'react';
import TitleBar from './components/TitleBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import NotesScreen from './screens/NotesScreen.jsx';
import NewNoteScreen from './screens/NewNoteScreen.jsx';
import PhotoNoteScreen from './screens/PhotoNoteScreen.jsx';
import CalculatorScreen from './screens/CalculatorScreen.jsx';
import SplashScreen from './screens/SplashScreen.jsx';
import { useNotes } from './hooks/useNotes.js';

export default function App() {
  const [phase, setPhase] = useState('splash'); // splash | app
  const [activeScreen, setActiveScreen] = useState('home');
  const { notes, addNote, deleteNote, searchNotes, filterByTag, refresh, loading } = useNotes();

  // Skip splash after 2.5s
  useEffect(() => {
    const timer = setTimeout(() => setPhase('app'), 2500);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useCallback((screen) => {
    setActiveScreen(screen);
  }, []);

  if (phase === 'splash') {
    return (
      <>
        <TitleBar />
        <SplashScreen />
      </>
    );
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen notes={notes} onNavigate={navigate} />;
      case 'notes':
        return <NotesScreen notes={notes} onNavigate={navigate} />;
      case 'new-note':
        return <NewNoteScreen onNavigate={navigate} onSave={addNote} />;
      case 'photo-note':
        return <PhotoNoteScreen onNavigate={navigate} onSave={addNote} />;
      case 'calculator':
        return <CalculatorScreen onNavigate={navigate} onSave={addNote} />;
      default:
        return <HomeScreen notes={notes} onNavigate={navigate} />;
    }
  };

  return (
    <>
      <TitleBar />
      <div className="app-layout">
        <Sidebar activeScreen={activeScreen} onNavigate={navigate} notes={notes} />
        <main className="main-content">
          {renderScreen()}
        </main>
      </div>
    </>
  );
}
