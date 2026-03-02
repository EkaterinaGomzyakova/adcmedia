import React, { useState, useEffect, useRef } from 'react'

const ArticleNavigation = ({ content }) => {
  const sections = content.filter((block) => block.type === 'section')
  const [activeSection, setActiveSection] = useState(sections[0]?.id || null)
  const isClickScrolling = useRef(false)
  const scrollTimeout = useRef(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      if (isClickScrolling.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      if (section.id) {
        const element = document.getElementById(section.id)
        if (element) {
          observer.observe(element)
        }
      }
    })

    return () => observer.disconnect()
  }, [sections])

  const handleClick = (e, sectionId) => {
    e.preventDefault()

    const element = document.getElementById(sectionId)
    if (element) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      isClickScrolling.current = true
      setActiveSection(sectionId)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })

      scrollTimeout.current = setTimeout(() => {
        isClickScrolling.current = false
      }, 1500)
    }
  }

  return (
    <nav className="W_MenuContainer">
      <div className="M_TextWithIcon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_2027_7562)">
            <path
              d="M10 6H20"
              stroke="#8E8E8E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="#8E8E8E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 12H20"
              stroke="#8E8E8E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 18H14"
              stroke="#8E8E8E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2027_7562">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className="A_Text">В этой истории</p>
      </div>
      <div className="С_MenuItemsContainer">
        {sections.map((section, index) => (
          <div
            key={section.id || index}
            className={`M_MenuItem ${activeSection === section.id ? 'active' : ''}`}
          >
            <div className="Q_ContentMark"></div>
            <a
              href={`#${section.id}`}
              className="A_Text"
              onClick={(e) => handleClick(e, section.id)}
            >
              {section.title}
            </a>
          </div>
        ))}
      </div>
    </nav>
  )
}

export default ArticleNavigation
