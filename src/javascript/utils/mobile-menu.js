import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import C_MobileMenu from '../components/C_MobileMenu.jsx'

function MobileMenuApp() {
  const [isOpen, setIsOpen] = useState(false)

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    window.addEventListener('openMobileMenu', handleOpen)
    window.addEventListener('closeMobileMenu', handleClose)

    return () => {
      window.removeEventListener('openMobileMenu', handleOpen)
      window.removeEventListener('closeMobileMenu', handleClose)
    }
  }, [])

  return <C_MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
}

export function initMobileMenu() {
  const container = document.getElementById('mobile-menu-root')
  if (container) {
    const root = createRoot(container)
    root.render(<MobileMenuApp />)
  }

  const menuButton = document.querySelector('.A_ButtonCircleMenu')
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      const event = new CustomEvent('openMobileMenu')
      window.dispatchEvent(event)
    })
  }
}

export function openMobileMenu() {
  const event = new CustomEvent('openMobileMenu')
  window.dispatchEvent(event)
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu)
  } else {
    initMobileMenu()
  }
}
