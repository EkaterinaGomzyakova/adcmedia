import React, { useState, useEffect } from 'react'
import O_UsefulCard from './O_UsefulCard.jsx'
import M_Pagination from './M_Pagination.jsx'
import usefulData from '../../data/useful.json'

const C_UsefulList = ({ selectedTags = [] }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Filter only articles (exclude graph type)
  const articles = usefulData.useful.filter((item) => item.type === 'article')

  // Filter articles based on selected tags
  const filteredArticles =
    selectedTags.length === 0
      ? articles
      : articles.filter((article) =>
          selectedTags.some((selectedTag) =>
            article.meta.tags.includes(selectedTag)
          )
        )

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedTags])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="C_UsefulList">
      <div className="C_UsefulListGrid">
        {currentArticles.length > 0 ? (
          currentArticles.map((article) => (
            <O_UsefulCard key={article.id} article={article} />
          ))
        ) : (
          <p className="no-results">
            Материалы не найдены. Попробуйте изменить фильтры.
          </p>
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

export default C_UsefulList
