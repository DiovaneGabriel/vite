import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import AppRoutes from './AppRoutes.tsx'

import { LanguageProvider } from './contexts/Language/Language.tsx'

import './i18n.ts'
import { AuthProvider } from './contexts/Auth/Auth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
