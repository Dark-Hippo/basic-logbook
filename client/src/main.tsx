import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LogbookProvider } from './context/LogbookContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';

import { testData } from './testData.ts'

const cognitoAuthConfig = {
  authority: `https://cognito-idp.${import.meta.env.VITE_COGNITO_REGION}.amazonaws.com/${import.meta.env.VITE_COGNITO_REGION}_${import.meta.env.VITE_COGNITO_USER_POOL_ID}`,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI,
  response_type: "code",
  scope: "phone openid email",
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <LogbookProvider initialLogbooks={testData}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </LogbookProvider>
    </AuthProvider>
  </React.StrictMode>,
)
