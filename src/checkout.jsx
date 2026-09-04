import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Checkout from './components/Checkout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Checkout />
  </StrictMode>,
)
