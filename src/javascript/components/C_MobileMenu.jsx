import React, { useEffect } from 'react'
import { toggleTheme } from '../utils/theme.js'

const C_MobileMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  const path = window.location.pathname

  const isActive = (href) => {
    if (href === '/feeds/interviews.html') return path.includes('/feeds/interviews') || path.includes('/interviews/')
    if (href === '/interview/graph.html') return path.includes('/interview/graph')
    if (href === '/feeds/useful.html') return path.includes('/feeds/useful') || path.includes('/useful/')
    if (href === '/about.html') return path.includes('/about')
    return false
  }

  const linkClass = (href) =>
    'C_MobileMenuLink' + (isActive(href) ? ' C_MobileMenuLink--active' : '')

  return (
    <div className="C_MobileMenuOverlay">
      <button className="C_MobileMenuClose A_ButtonCircle" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_mobile_close)">
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_mobile_close">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <nav className="C_MobileMenuNav">
        <a href="/feeds/interviews.html" className={linkClass('/feeds/interviews.html')}>
          Интервью
        </a>
        <div className="Q_Dot C_MobileMenuDot"></div>
        <a href="/interview/graph.html" className={linkClass('/interview/graph.html')}>
          Связи
        </a>
        <div className="Q_Dot C_MobileMenuDot"></div>
        <a href="/feeds/useful.html" className={linkClass('/feeds/useful.html')}>
          Полезные материалы
        </a>
        <div className="Q_Dot C_MobileMenuDot"></div>
        <a href="/about.html" className={linkClass('/about.html')}>
          О нас
        </a>
        <button className="C_MobileMenuTheme" onClick={() => toggleTheme()}>
          <img
            className="Q_Icon Q_IconDark"
            src="/images/Q_IconTheme.svg"
            alt="Кнопка смены темы"
          />
          <img
            className="Q_Icon Q_IconLight"
            src="/images/Q_IconThemeLight.svg"
            alt="Кнопка смены темы"
          />
        </button>
      </nav>
    </div>
  )
}

export default C_MobileMenu
