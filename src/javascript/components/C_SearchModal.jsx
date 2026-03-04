import React, { useState, useEffect, useRef } from 'react'
import interviewsData from '../../data/interviews-feed.json'
import usefulData from '../../data/useful.json'
import O_ArticlePreview from './O_ArticlePreview.jsx'
import O_UsefulCard from './O_UsefulCard.jsx'

const C_SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ interviews: [], useful: [] })
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
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
    if (!query.trim() || query.trim().length < 3) {
      setResults({ interviews: [], useful: [] })
      return
    }

    const searchQuery = query.toLowerCase()

    const matchedInterviews = interviewsData.filter((interview) => {
      const titleMatch = interview.title?.toLowerCase().includes(searchQuery)
      const descMatch = interview.description
        ?.toLowerCase()
        .includes(searchQuery)
      const authorMatch = interview.author?.name
        ?.toLowerCase()
        .includes(searchQuery)
      const tagsMatch = interview.meta?.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery)
      )
      return titleMatch || descMatch || authorMatch || tagsMatch
    })

    const matchedUseful = usefulData.useful.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(searchQuery)
      const tagsMatch = item.meta?.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery)
      )
      return titleMatch || tagsMatch
    })

    setResults({
      interviews: matchedInterviews,
      useful: matchedUseful
    })
  }, [query])

  const totalResults = results.interviews.length + results.useful.length
  const hasContent = query.trim() && totalResults > 0

  if (!isOpen) return null

  return (
    <div
      className={`C_SearchModalOverlay ${hasContent ? 'C_SearchModalOverlay--withContent' : ''}`}
      onClick={onClose}
    >
      <div className="C_SearchInputContainer" onClick={(e) => e.stopPropagation()}>
        <div className="M_SearchBox">
          <input
            ref={inputRef}
            type="text"
            placeholder="Искать..."
            className="A_SearchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="A_ButtonCircle" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_2001_18635)">
                <path
                  d="M18 6L6 18"
                  stroke="#FDFDFD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#FDFDFD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2001_18635">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="Q_SnapshotSearch"></div>
      </div>

      {query.trim() && totalResults > 0 && (
        <div className="C_SearchResultsContainer" onClick={(e) => e.stopPropagation()}>
          <div className="W_SearchResultsWrapper">
            <p className="A_SearchCount">{totalResults} результата</p>

            {results.interviews.length > 0 && (
              <div className="C_SearchSection">
                <h2>Интервью</h2>
                <div className="C_MainPageInterviewsList">
                  {results.interviews.map((interview, index) => (
                    <React.Fragment key={interview.id}>
                      <O_ArticlePreview
                        interview={interview}
                        isReversed={index % 2 !== 0}
                      />
                      {index < results.interviews.length - 1 && (
                        <div className="Q_Line"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {results.useful.length > 0 && (
              <div className="C_SearchSection">
                <h2>Полезные материалы</h2>
                <div className="C_UsefulListGrid">
                  {results.useful.map((article) => (
                    <O_UsefulCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default C_SearchModal
