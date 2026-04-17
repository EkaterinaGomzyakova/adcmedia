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
import C_UsefulList from '../components/C_UsefulList.jsx'
import tagsUsefulData from '../../data/tags-useful.json'

const UsefulPageApp = ({ tagsContainer, usefulContainer }) => {
  const [selectedTags, setSelectedTags] = useState([])

  return (
    <>
      {createPortal(
        <C_Tags
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tagsArray={tagsUsefulData.tags}
        />,
        tagsContainer
      )}
      {createPortal(
        <C_UsefulList selectedTags={selectedTags} />,
        usefulContainer
      )}
    </>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const tagsContainer = document.getElementsByClassName('C_Tags')[0]
  const usefulFeedContainer = document.getElementById('interviews-feed-root')

  if (tagsContainer && usefulFeedContainer) {
    const appContainer = document.createElement('div')
    document.body.appendChild(appContainer)

    const root = createRoot(appContainer)
    root.render(
      <UsefulPageApp
        tagsContainer={tagsContainer}
        usefulContainer={usefulFeedContainer}
      />
    )
  }
})
