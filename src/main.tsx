import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/montserrat'
import '@fontsource/playfair-display/latin-400-italic.css'
import '@fontsource/playfair-display/latin-600-italic.css'
import '@fontsource/playfair-display/latin-700-italic.css'
import './index.css'
import App from './App'
import { armIntroSafetyNet } from './lib/intro'

armIntroSafetyNet()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
