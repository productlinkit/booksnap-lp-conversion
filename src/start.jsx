import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Start from './components/Start.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Start />
  </StrictMode>,
)
