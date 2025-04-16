
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import ArtisanProvider from './Contexts/ArtisansContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ArtisanProvider>
      <App />
    </ArtisanProvider>
  </BrowserRouter>

)
