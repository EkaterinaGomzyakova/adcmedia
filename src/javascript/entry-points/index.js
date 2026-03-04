import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import '../utils/quotes-carousel.js'
import '../utils/navigation.js'
import '../utils/search-modal.js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import C_MainPageInterviews from '../components/C_MainPageInterviews.jsx'
import C_MainPageUseful from '../components/C_MainPageUseful.jsx'
import C_TagsMarquee from '../components/C_TagsMarquee.jsx'

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

// Render interviews and useful on main page
document.addEventListener('DOMContentLoaded', () => {
  // Render interviews
  const interviewsContainer = document.querySelector(
    '.T_InterviewBlockMainPage'
  )
  if (interviewsContainer) {
    let listContainer = interviewsContainer.querySelector(
      '.C_MainPageInterviewsList'
    )
    if (!listContainer) {
      listContainer = document.createElement('div')
      interviewsContainer.appendChild(listContainer)
    }

    const root = createRoot(listContainer)
    root.render(<C_MainPageInterviews />)
  }

  // Render useful
  const usefulContainer = document.querySelector('.T_UsefulBlockMainPage')
  if (usefulContainer) {
    let gridContainer = usefulContainer.querySelector('.C_MainPageUsefulGrid')
    if (!gridContainer) {
      gridContainer = document.createElement('div')
      usefulContainer.appendChild(gridContainer)
    }

    const root = createRoot(gridContainer)
    root.render(<C_MainPageUseful />)
  }

  const tagsContainer = document.querySelector('.C_TagsMainPage')
  if (tagsContainer) {
    const root = createRoot(tagsContainer)
    root.render(<C_TagsMarquee />)
  }
})
