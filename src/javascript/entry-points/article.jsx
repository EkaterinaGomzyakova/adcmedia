import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Article from '../components/article/Article.jsx'

// Получить slug из pathname
function getArticleSlugFromPath() {
  const pathname = window.location.pathname
  const parts = pathname.split('/')
  const slug = parts[parts.length - 1].replace('.html', '')

  // Если это базовый путь /interviews/article.html, используем дефолтное значение
  if (slug === 'article' || slug === 'interviews' || slug === '') {
    return 'article-example'
  }

  return slug
}

import articleExampleData from '../../data/article-example.json'

// Маппинг slug -> данные статьи
const articlesMap = {
  'article-example': articleExampleData
}

function loadArticle() {
  const slug = getArticleSlugFromPath()
  const articleData = articlesMap[slug]

  if (articleData) {
    const container = document.getElementById('article-root')
    if (container) {
      const root = createRoot(container)
      root.render(<Article data={articleData} />)
    }
  } else {
    console.error('Article not found:', slug)
  }
}

document.addEventListener('DOMContentLoaded', loadArticle)
