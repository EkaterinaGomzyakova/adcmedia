import React, { useState, useEffect } from 'react'
import O_ArticlePreview from './O_ArticlePreview.jsx'
import M_Pagination from './M_Pagination.jsx'
import interviewsData from '../../data/interviews-feed.json'

const C_InterviewsList = ({ selectedTags = [] }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7

  // Filter interviews based on selected tags
  const filteredInterviews =
    selectedTags.length === 0
      ? interviewsData
      : interviewsData.filter((interview) =>
          selectedTags.some((selectedTag) => interview.tags.includes(selectedTag))
        )

  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedTags])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentInterviews = filteredInterviews.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="C_Interviews">
      <div className="C_InterviewsList">
        {currentInterviews.length > 0 ? (
          currentInterviews.map((interview, index) => (
            <React.Fragment key={interview.id}>
              <O_ArticlePreview
                key={interview.id}
                interview={interview}
                isReversed={index % 2 !== 0}
              />
              {index < currentInterviews.length - 1 && (
                <div className="Q_Line"></div>
              )}
            </React.Fragment>
          ))
        ) : (
          <p className="no-results">Интервью не найдены. Попробуйте изменить фильтры.</p>
        )}
      </div>
      {totalPages > 1 && (
        <M_Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default C_InterviewsList
