import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import C_SearchModal from '../components/C_SearchModal.jsx'

function SearchModalApp() {
  const [isOpen, setIsOpen] = useState(false)

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('openSearchModal', handleOpen)
    window.addEventListener('closeSearchModal', handleClose)
    document.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('openSearchModal', handleOpen)
      window.removeEventListener('closeSearchModal', handleClose)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return <C_SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
}

export function initSearchModal() {
  const container = document.getElementById('search-modal-root')
  if (container) {
    const root = createRoot(container)
    root.render(<SearchModalApp />)
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchModal)
  } else {
    initSearchModal()
  }
}
