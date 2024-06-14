
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header'
import { useTheme } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Logbook } from './pages/Logbook';
import { NotFound } from './pages/404';
import { LogbookDay } from './pages/LogbookDay';

function App() {
  const { theme } = useTheme();

  return (
    <div id='container' className={theme}>
      <Routes>
        <Route path='logbook/:logbookId/' element={<Header back={true} title='Simple logbook' />} />
        <Route path='logbook/:logbookId/:date' element={<Header back={true} title='Simple logbook' />} />
        <Route path='*' element={<Header back={false} title='Simple logbook' />} />
      </Routes>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='logbook/:logbookId/' element={<Logbook />} />
          <Route path='logbook/:logbookId/:date' element={<LogbookDay />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
