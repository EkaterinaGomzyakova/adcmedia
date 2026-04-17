import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import '../utils/navigation.js'
import '../utils/search-modal.js'
import '../utils/mobile-menu.js'
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'
import C_Tags from '../components/C_Tags.jsx'
import C_InterviewsList from '../components/C_InterviewsList.jsx'

const InterviewsPageApp = ({ tagsContainer, interviewsContainer }) => {
  const [selectedTags, setSelectedTags] = useState([])

  return (
    <>
      {createPortal(
        <C_Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />,
        tagsContainer
      )}
      {createPortal(
        <C_InterviewsList selectedTags={selectedTags} />,
        interviewsContainer
      )}
    </>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const tagsContainer = document.getElementsByClassName('C_Tags')[0]
  const interviewsFeedContainer = document.getElementById('interviews-feed-root')

  if (tagsContainer && interviewsFeedContainer) {
    const appContainer = document.createElement('div')
    document.body.appendChild(appContainer)

    const root = createRoot(appContainer)
    root.render(
      <InterviewsPageApp
        tagsContainer={tagsContainer}
        interviewsContainer={interviewsFeedContainer}
      />
    )
  }
})
