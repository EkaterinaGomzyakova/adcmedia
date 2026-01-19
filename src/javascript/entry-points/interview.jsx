import '../../index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import interviewsData from '../../data/interviews.json'

// Получить ID из hash
function getInterviewIdFromHash() {
  const hash = window.location.hash.replace('#', '')
  return hash || 'interview-1' // дефолтное значение
}

// Обновить метаданные страницы
function updateMetadata(interview) {
  // Title
  document.getElementById('page-title').textContent = interview.seo.metaTitle

  // Meta tags
  document
    .getElementById('meta-description')
    .setAttribute('content', interview.seo.metaDescription)
  document
    .getElementById('meta-keywords')
    .setAttribute('content', interview.seo.keywords.join(', '))

  // Open Graph
  document
    .getElementById('og-title')
    .setAttribute('content', interview.seo.metaTitle)
  document
    .getElementById('og-description')
    .setAttribute('content', interview.seo.metaDescription)
  document
    .getElementById('og-url')
    .setAttribute(
      'content',
      `https://media.adc.ac/interview/single.html#${interview.slug}`
    )
  document
    .getElementById('og-image')
    .setAttribute('content', `https://media.adc.ac${interview.seo.ogImage}`)
}

function loadInterview() {
  const interviewId = getInterviewIdFromHash()
  const interview = interviewsData.interviews.find(
    (i) => i.id === interviewId || i.slug === interviewId
  )

  if (interview) {
    updateMetadata(interview)

    const container = document.getElementById('interview-single-root')
    if (container) {
      const root = createRoot(container)
      root.render(<O_InterviewSingle interview={interview} />)
    }
  } else {
    console.error('Interview not found:', interviewId)
  }
}

document.addEventListener('DOMContentLoaded', loadInterview)

window.addEventListener('hashchange', () => {
  loadInterview()
})
