import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import '../utils/navigation.js'
import '../utils/search-modal.js'
import '../utils/mobile-menu.js'
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
    return 'article1'
  }

  return slug
}

import article1Data from '../../data/articles/article1.json'
import article2Data from '../../data/articles/article2.json'
import article3Data from '../../data/articles/article3.json'
import article4Data from '../../data/articles/article4.json'
import article5Data from '../../data/articles/article5.json'
import article6Data from '../../data/articles/article6.json'
import article7Data from '../../data/articles/article7.json'
import article8Data from '../../data/articles/article8.json'

// Маппинг slug -> данные статьи
const articlesMap = {
  article1: article1Data,
  article2: article2Data,
  article3: article3Data,
  article4: article4Data,
  article5: article5Data,
  article6: article6Data,
  article7: article7Data,
  article8: article8Data
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
