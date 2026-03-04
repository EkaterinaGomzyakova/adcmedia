import React, { useState, useEffect } from 'react'
import interviewsData from '../../data/interviews-feed.json'
import usefulData from '../../data/useful.json'
import O_ArticlePreview from './O_ArticlePreview.jsx'
import O_UsefulCard from './O_UsefulCard.jsx'

const C_SearchResults = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ interviews: [], useful: [] })

  useEffect(() => {
    const searchInput = document.getElementById('search-input')

    const handleSearch = (e) => {
      const searchQuery = e.target.value.toLowerCase()
      setQuery(searchQuery)

      if (!searchQuery.trim()) {
        setResults({ interviews: [], useful: [] })
        return
      }

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
    }

    if (searchInput) {
      searchInput.addEventListener('input', handleSearch)
    }

    return () => {
      if (searchInput) {
        searchInput.removeEventListener('input', handleSearch)
      }
    }
  }, [])

  const totalResults = results.interviews.length + results.useful.length

  if (!query.trim()) {
    return null
  }

  return (
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

      {totalResults === 0 && <p className="A_NoResults">Ничего не найдено</p>}
    </div>
  )
}

export default C_SearchResults
