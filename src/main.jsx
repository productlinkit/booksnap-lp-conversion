import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

/**
 * Arm the scroll reveals.
 *
 * `.fade-*` elements start at `opacity: 0` and are only ever un-hidden by JS,
 * so if the bundle fails to run they would leave the page permanently blank
 * below the fold. Scoping the hidden state to this class means a broken or
 * blocked bundle degrades to a fully readable static page instead. Browsers
 * without IntersectionObserver skip the animation the same way.
 */
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
