import React from 'react'

const ArticleSection = ({ id, title }) => {
  return (
    <div id={id} className="M_DividerLine" data-section-title={title}>
      <div className="Q_Line"></div>
      <div className="A_Divider">{title}</div>
    </div>
  )
}

export default ArticleSection
