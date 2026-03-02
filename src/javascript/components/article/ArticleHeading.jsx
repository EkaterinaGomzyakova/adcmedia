import React from 'react'

const ArticleHeading = ({ text, number }) => {
  return (
    <div className="W_TextBlockArticle">
      <div className="M_NumberQuestion">
        <p className="A_Text">{String(number).padStart(2, '0')}</p>
      </div>
      <h2>{text}</h2>
    </div>
  )
}

export default ArticleHeading
