import '../../index.css'
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
