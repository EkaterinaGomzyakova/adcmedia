import React from 'react'

const ArticleImage = ({ image, caption }) => {
  return (
    <div className="M_ImageWithCaption">
      <div className="Q_ImageArticle">
        <img src={image} alt={caption} />
      </div>
      {caption && <p className="A_Text">{caption}</p>}
    </div>
  )
}

export default ArticleImage
