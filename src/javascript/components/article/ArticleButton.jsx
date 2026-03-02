import React from 'react'

const ArticleButton = ({ text, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="A_ButtonAction"
    >
      <div className="Q_Dot"></div>
      <span>{text}</span>
    </a>
  )
}

export default ArticleButton
