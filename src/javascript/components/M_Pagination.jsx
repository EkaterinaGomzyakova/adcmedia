import React from 'react'

const M_Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="M_Pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={`M_PaginationButton ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {String(page).padStart(2, '0')}
        </button>
      ))}
    </div>
  )
}

export default M_Pagination
