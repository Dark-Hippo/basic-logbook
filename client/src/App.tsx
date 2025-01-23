import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header'
import { useTheme } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Logbook } from './pages/Logbook';
import { NotFound } from './pages/404';
import { LogbookDay } from './pages/LogbookDay';
import { Compare } from './pages/Compare';
import { useServerVersion } from './hooks/useServerVersion';

function App() {
  const { theme } = useTheme();
  const { version, error, loading } = useServerVersion();

  return (
    <div id='container' className={theme}>
      <Routes>
        <Route path='logbook/:logbookId/' element={<Header back={true} title='Simple logbook' />} />
        <Route path='logbook/:logbookId/:date' element={<Header back={true} title='Simple logbook' />} />
        <Route path='compare' element={<Header back={true} title='Simple logbook' />} />
        <Route path='*' element={<Header back={false} title='Simple logbook' />} />
      </Routes>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='logbook/:logbookId/' element={<Logbook />} />
          <Route path='logbook/:logbookId/:date' element={<LogbookDay />} />
          <Route path='compare' element={<Compare />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <footer>
        {loading ? (
          <span>Loading version...</span>
        ) : error ? (
          <span>Error: {error}</span>
        ) : (
          <span>{version}</span>
        )}
      </footer>
    </div>
  )
}

export default App
