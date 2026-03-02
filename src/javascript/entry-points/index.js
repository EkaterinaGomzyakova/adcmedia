import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import React from 'react'
import { createRoot } from 'react-dom/client'

// Импорт изображений для webpack
import '../../images/A_Logo.svg'
import '../../images/A_LogoLight.svg'
import '../../images/A_LogoMobile.svg'
import '../../images/A_LogoMobileLight.svg'
import '../../images/arrow-right.svg'
import '../../images/chevron-right.svg'
import '../../images/search.svg'
import '../../images/telegram.svg'
import '../../images/telegramDark.svg'
import '../../images/arrow-top.svg'
import '../../images/Q_IconTheme.svg'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-root')
  if (container) {
    const root = createRoot(container)
    root.render(<div>Hero</div>)
  }
})
