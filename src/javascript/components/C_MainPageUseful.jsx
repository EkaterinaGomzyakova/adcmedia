import React from 'react'
import O_UsefulCard from './O_UsefulCard.jsx'
import usefulData from '../../data/useful.json'

const C_MainPageUseful = () => {
  // Get first 2 useful articles
  const articles = usefulData.useful.filter((item) => item.type === 'article').slice(0, 2)

  return (
    <div className="C_MainPageUsefulGrid">
      {articles.map((article) => (
        <O_UsefulCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export default C_MainPageUseful
