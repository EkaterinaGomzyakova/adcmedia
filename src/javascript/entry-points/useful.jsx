import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import '../utils/navigation.js'
import '../utils/search-modal.js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import UsefulArticle from '../components/article/UsefulArticle.jsx'
import designDrillsData from '../../data/useful-design-drills-workshop.json'

// Получить slug из pathname
function getArticleSlugFromPath() {
  const pathname = window.location.pathname
  const parts = pathname.split('/')
  // Получаем последний сегмент пути, например "design-drills-workshop" из "/useful/design-drills-workshop"
  const slug = parts[parts.length - 1].replace('.html', '')

  // Если это базовый путь /useful/article.html, используем дефолтное значение
  if (slug === 'article' || slug === 'useful' || slug === '') {
    return 'design-drills-workshop'
  }

  return slug
}

// Обновить метаданные страницы
function updateMetadata(article) {
  // Title
  document.getElementById('page-title').textContent = article.seo.metaTitle

  // Meta tags
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
      `https://media.adc.ac/useful/${article.slug}.html`
    )
  document
    .getElementById('og-image')
    .setAttribute('content', `https://media.adc.ac${article.seo.ogImage}`)
}

// Адаптировать данные из useful.json под формат Article
function adaptUsefulToArticle(article) {
  // Нормализуем content - меняем heading.content на heading.text
  const normalizedContent = article.content.map((block) => {
    if (block.type === 'heading' && block.content) {
      return {
        ...block,
        text: block.content
      }
    }
    return block
  })

  return {
    hero: article.hero,
    content: normalizedContent
  }
}

// Маппинг slug -> данные статьи
const articlesMap = {
  'design-drills-workshop': designDrillsData
}

function loadArticle() {
  const slug = getArticleSlugFromPath()
  const article = articlesMap[slug]

  if (article) {
    updateMetadata(article)

    const articleData = adaptUsefulToArticle(article)

    const container = document.getElementById('article-root')
    if (container) {
      const root = createRoot(container)
      root.render(<UsefulArticle data={articleData} />)
    }
  } else {
    console.error('Article not found:', slug)
  }
}

document.addEventListener('DOMContentLoaded', loadArticle)
