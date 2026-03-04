import React from 'react'
import O_ArticlePreview from './O_ArticlePreview.jsx'
import interviewsData from '../../data/interviews-feed.json'

const C_MainPageInterviews = () => {
  // Get first 3 interviews
  const interviews = interviewsData.slice(0, 3)

  return (
    <div className="C_MainPageInterviewsList">
      {interviews.map((interview, index) => (
        <React.Fragment key={interview.id}>
          <O_ArticlePreview interview={interview} isReversed={index % 2 !== 0} />
          {index < interviews.length - 1 && <div className="Q_Line"></div>}
        </React.Fragment>
      ))}
    </div>
  )
}

export default C_MainPageInterviews
