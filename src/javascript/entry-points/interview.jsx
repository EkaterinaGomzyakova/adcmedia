import '../../index.css'
import '../utils/theme.js'
import '../utils/scroll.js'
import '../utils/navigation.js'
import '../utils/search-modal.js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Article from '../components/article/Article.jsx'

// Получить slug из pathname
function getInterviewSlugFromPath() {
  const pathname = window.location.pathname
  const parts = pathname.split('/')
  const slug = parts[parts.length - 1].replace('.html', '')

  // Если это базовый путь /interview/single.html, используем дефолтное значение
  if (slug === 'single' || slug === 'interview' || slug === '') {
    return 'example-interview-1'
  }

  return slug
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
      `https://media.adc.ac/interview/${interview.slug}.html`
    )
  document
    .getElementById('og-image')
    .setAttribute('content', `https://media.adc.ac${interview.seo.ogImage}`)
}

// Адаптировать данные из interviews.json под формат Article
function adaptInterviewToArticle(interview) {
  const articleData = {
    hero: {
      title: interview.title,
      readTime: interview.meta.readingTime,
      tags: interview.meta.tags,
      author: {
        name: interview.author.name,
        avatar: interview.author.image
      },
      description: interview.description,
      images: interview.preview.image
        ? {
            cover1: interview.preview.image,
            cover2: interview.preview.image
          }
        : null
    },
    content: []
  }

  // Добавляем видео как текст со ссылкой (позже можно заменить на iframe)
  if (interview.content.type === 'video' && interview.content.videoUrl) {
    articleData.content.push({
      type: 'heading',
      text: 'Видео интервью'
    })
    articleData.content.push({
      type: 'text',
      content: `Смотреть видео: ${interview.content.videoUrl}`
    })
  }

  // Добавляем ключевые моменты
  if (interview.content.highlights && interview.content.highlights.length > 0) {
    articleData.content.push({
      type: 'heading',
      text: 'Ключевые моменты'
    })
    interview.content.highlights.forEach((highlight) => {
      articleData.content.push({
        type: 'text',
        content: `• ${highlight}`
      })
    })
  }

  // Добавляем транскрипт
  if (interview.content.transcript) {
    articleData.content.push({
      type: 'heading',
      text: 'Транскрипт'
    })
    articleData.content.push({
      type: 'text',
      content: interview.content.transcript
    })
  }

  return articleData
}

// Маппинг slug -> данные интервью (пока пустой, добавляй по мере создания)
const interviewsMap = {
  // 'example-interview-1': exampleInterview1Data
}

function loadInterview() {
  const slug = getInterviewSlugFromPath()
  const interview = interviewsMap[slug]

  if (interview) {
    updateMetadata(interview)

    const articleData = adaptInterviewToArticle(interview)

    const container = document.getElementById('interview-single-root')
    if (container) {
      const root = createRoot(container)
      root.render(<Article data={articleData} />)
    }
  } else {
    console.error('Interview not found:', slug)
  }
}

document.addEventListener('DOMContentLoaded', loadInterview)
