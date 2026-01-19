import '../../index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'

// Импорт изображений для webpack
import '../../images/Q_Logo.svg'
import '../../images/arrow-right.svg'
import '../../images/chevron-right.svg'
import '../../images/search.svg'
import '../../images/telegram.svg'
import '../../images/telegramDark.svg'
import '../../images/arrow-top.svg'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-root')
  if (container) {
    const root = createRoot(container)
    root.render(<div>Hero</div>)
  }
})
