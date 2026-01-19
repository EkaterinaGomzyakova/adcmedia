import '../../index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import usefulData from '../../data/useful.json'

// Получить ID из hash
function getArticleIdFromHash() {
  const hash = window.location.hash.replace('#', '')
  return hash || 'useful-1'
}

// Обновить метаданные
function updateMetadata(article) {
  document.getElementById('page-title').textContent = article.seo.metaTitle
  document
    .getElementById('meta-description')
    .setAttribute('content', article.seo.metaDescription)
  document
    .getElementById('meta-keywords')
    .setAttribute('content', article.seo.keywords.join(', '))

  // Open Graph
  document
    .getElementById('og-title')
    .setAttribute('content', article.seo.metaTitle)
  document
    .getElementById('og-description')
    .setAttribute('content', article.seo.metaDescription)
  document
    .getElementById('og-url')
    .setAttribute(
      'content',
      `https://media.adc.ac/useful/article.html#${article.slug}`
    )
  document
    .getElementById('og-image')
    .setAttribute('content', `https://media.adc.ac${article.seo.ogImage}`)
}

function loadArticle() {
  const articleId = getArticleIdFromHash()
  const article = usefulData.useful.find(
    (i) => i.id === articleId || i.slug === articleId
  )

  if (article) {
    updateMetadata(article)

    const container = document.getElementById('article-root')
    if (container) {
      const root = createRoot(container)
      root.render(<div>Статья</div>)
    }
  } else {
    console.error('Article not found:', articleId)
  }
}

document.addEventListener('DOMContentLoaded', loadArticle)
window.addEventListener('hashchange', loadArticle)
