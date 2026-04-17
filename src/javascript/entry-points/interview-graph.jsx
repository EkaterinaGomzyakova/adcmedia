import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import '../utils/navigation.js'
import '../utils/search-modal.js'
import '../utils/mobile-menu.js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import O_canvasCards from '../components/O_canvasCards/O_canvasCards.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.O_canvasCards')
  if (container) {
    const root = createRoot(container)
    root.render(<O_canvasCards />)
  }
})
