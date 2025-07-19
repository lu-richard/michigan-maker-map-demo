import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
// import SignIn from './pages/SignIn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
