import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LoanProvider } from './context/LoanContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoanProvider>
        <App />
      </LoanProvider>
    </BrowserRouter>
  </StrictMode>,
)
