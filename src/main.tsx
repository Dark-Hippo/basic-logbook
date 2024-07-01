import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LogbookProvider } from './context/LogbookContext.tsx';
import { BrowserRouter } from 'react-router-dom';

import { testData } from './testData.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LogbookProvider initialLogbooks={testData}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </LogbookProvider>
  </React.StrictMode>,
)
