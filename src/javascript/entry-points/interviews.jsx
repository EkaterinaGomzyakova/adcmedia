import '../../index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('interview-feed-root')
  if (container) {
    const root = createRoot(container)
    root.render(<div>Интервью</div>)
  }
})
