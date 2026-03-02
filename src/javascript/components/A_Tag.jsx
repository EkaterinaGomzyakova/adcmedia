import React from 'react'

const A_Tag = ({ tagName, handleClick, isActive = false }) => {
  return (
    <button
      className={`A_Tag ${isActive ? 'active' : ''}`}
      onClick={() => handleClick(tagName)}
    >
      <div className="Q_Dot Q_Dot-big"></div>
      {tagName}
    </button>
  )
}

export default A_Tag
