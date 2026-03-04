import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import C_SearchResults from '../components/C_SearchResults.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input')
  const closeButton = document.getElementById('close-search')
  const resultsContainer = document.getElementById('search-results')

  if (searchInput) {
    searchInput.focus()
  }

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      window.history.back()
    })
  }

  if (resultsContainer) {
    const root = createRoot(resultsContainer)
    root.render(<C_SearchResults />)
  }
})
