import React, { useEffect } from 'react'
import ArticleHero from './ArticleHero.jsx'
import ArticleNavigation from './ArticleNavigation.jsx'
import ArticleImage from './ArticleImage.jsx'
import ArticleQuote from './ArticleQuote.jsx'
import ArticleSection from './ArticleSection.jsx'

const renderTextContent = (item) => {
  if (item.parts) {
    return (
      <>
        {item.parts.map((part, i) => {
          if (part.type === 'inline-svg') {
            return (
              <span key={i} className="Q_InlineIcon" data-tooltip={part.tooltip || null}>
                <img src={part.src} alt={part.alt || ''} className="Q_IconDark" />
                {part.srcLight && (
                  <img src={part.srcLight} alt={part.alt || ''} className="Q_IconLight" />
                )}
              </span>
            )
          }
          return <span key={i}>{part.content}</span>
        })}
      </>
    )
  }
  return item.content
}

const Article = ({ data }) => {
  const { hero, navigation, content } = data

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  let sectionIndex = 0
  const contentWithIds = content.map((block) => {
    if (block.type === 'section' && !block.id) {
      sectionIndex++
      return {
        ...block,
        id: `section-${sectionIndex}`
      }
    }
    return block
  })

  const groupedContent = []
  let headingCounter = 0
  let i = 0

  while (i < contentWithIds.length) {
    const block = contentWithIds[i]
    console.log('Processing block:', block.type, block)

    if (block.type === 'section') {
      const answerBlock = {
        type: 'answerBlock',
        section: block,
        divider: null,
        blocks: []
      }

      i++

      if (i < contentWithIds.length && contentWithIds[i].type === 'divider') {
        answerBlock.divider = contentWithIds[i]
        i++
      }

      while (
        i < contentWithIds.length &&
        contentWithIds[i].type !== 'section' &&
        contentWithIds[i].type !== 'heading'
      ) {
        answerBlock.blocks.push(contentWithIds[i])
        i++
      }

      if (i < contentWithIds.length && contentWithIds[i].type === 'heading') {
        headingCounter++
        const headingGroup = {
          type: 'headingGroup',
          number: headingCounter,
          heading: contentWithIds[i],
          blocks: []
        }
        i++

        while (
          i < contentWithIds.length &&
          (contentWithIds[i].type === 'text' ||
            contentWithIds[i].type === 'quote')
        ) {
          headingGroup.blocks.push(contentWithIds[i])
          i++
        }

        answerBlock.blocks.push(headingGroup)

        while (
          i < contentWithIds.length &&
          contentWithIds[i].type !== 'section' &&
          contentWithIds[i].type !== 'heading'
        ) {
          answerBlock.blocks.push(contentWithIds[i])
          i++
        }
      }

      groupedContent.push(answerBlock)

      while (
        i < contentWithIds.length &&
        contentWithIds[i].type === 'heading'
      ) {
        const nextAnswerBlock = {
          type: 'answerBlock',
          section: null,
          divider: null,
          blocks: []
        }

        headingCounter++
        const headingGroup = {
          type: 'headingGroup',
          number: headingCounter,
          heading: contentWithIds[i],
          blocks: []
        }
        i++

        while (
          i < contentWithIds.length &&
          (contentWithIds[i].type === 'text' ||
            contentWithIds[i].type === 'quote')
        ) {
          headingGroup.blocks.push(contentWithIds[i])
          i++
        }

        nextAnswerBlock.blocks.push(headingGroup)

        while (
          i < contentWithIds.length &&
          contentWithIds[i].type !== 'section' &&
          contentWithIds[i].type !== 'heading'
        ) {
          nextAnswerBlock.blocks.push(contentWithIds[i])
          i++
        }

        groupedContent.push(nextAnswerBlock)
      }
    } else if (block.type === 'heading') {
      headingCounter++
      const group = {
        type: 'headingGroup',
        number: headingCounter,
        heading: block,
        blocks: []
      }

      i++
      while (
        i < contentWithIds.length &&
        (contentWithIds[i].type === 'text' ||
          contentWithIds[i].type === 'quote')
      ) {
        group.blocks.push(contentWithIds[i])
        i++
      }

      groupedContent.push(group)
    } else {
      groupedContent.push(block)
      i++
    }
  }

  console.log('Grouped content:', groupedContent)

  const handleCopyHeadingLink = (headingNumber) => {
    const url = `${window.location.origin}${window.location.pathname}#heading-${headingNumber}`
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('Ссылка на раздел скопирована:', url)
      })
      .catch((err) => {
        console.error('Ошибка копирования:', err)
      })
  }

  const renderBlock = (block, index) => {
    if (block.type === 'answerBlock') {
      return (
        <div key={index} className="O_AnswerBlockArticle">
          {block.section && (
            <ArticleSection id={block.section.id} title={block.section.title} />
          )}

          {block.divider && (
            <div className="M_DividerLine">
              <div className="Q_Line"></div>
              <div className="A_Divider">
                <p className="A_Text">{block.divider.title}</p>
              </div>
            </div>
          )}

          {block.blocks.map((innerBlock, innerIndex) => {
            if (innerBlock.type === 'headingGroup') {
              return (
                <div key={innerIndex} className="W_TextBlockArticle" id={`heading-${innerBlock.number}`}>
                  <div className="M_NumberQuestion" onClick={() => handleCopyHeadingLink(innerBlock.number)}>
                    <p>{String(innerBlock.number).padStart(2, '0')}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="Q_IconDark">
                      <g clipPath="url(#clip0_2009_7549)">
                        <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.5608 6.96685 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.6661 2.05659 16.9771C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_2009_7549">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="Q_IconLight">
                      <g clipPath="url(#clip0_2009_7550)">
                        <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke="#FDFDFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.5608 6.96685 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.6661 2.05659 16.9771C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#FDFDFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_2009_7550">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="M_Paragraph">
                    <h2>{innerBlock.heading.text}</h2>
                    {innerBlock.blocks.map((item, itemIndex) => {
                      if (item.type === 'text') {
                        return (
                          <p key={itemIndex} className="paragraphLarge">
                            {renderTextContent(item)}
                          </p>
                        )
                      } else if (item.type === 'quote') {
                        return <ArticleQuote key={itemIndex} text={item.text} />
                      }
                      return null
                    })}
                  </div>
                </div>
              )
            }

            switch (innerBlock.type) {
              case 'text':
                return (
                  <div key={innerIndex} className="M_Paragraph">
                    <p className="paragraphLarge">{innerBlock.content}</p>
                  </div>
                )
              case 'image':
                return (
                  <ArticleImage
                    key={innerIndex}
                    image={innerBlock.image}
                    caption={innerBlock.caption}
                  />
                )
              case 'quote':
                return <ArticleQuote key={innerIndex} text={innerBlock.text} />
              default:
                return null
            }
          })}
        </div>
      )
    }

    if (block.type === 'headingGroup') {
      return (
        <div key={index} className="W_TextBlockArticle" id={`heading-${block.number}`}>
          <div className="M_NumberQuestion" onClick={() => handleCopyHeadingLink(block.number)}>
            <p>{String(block.number).padStart(2, '0')}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="Q_IconDark">
              <g clipPath="url(#clip0_2009_7549)">
                <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.5608 6.96685 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.6661 2.05659 16.9771C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_2009_7549">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="Q_IconLight">
              <g clipPath="url(#clip0_2009_7550)">
                <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke="#FDFDFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.5608 6.96685 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.6661 2.05659 16.9771C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#FDFDFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_2009_7550">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="M_Paragraph">
            <h2>{block.heading.text}</h2>
            {block.blocks.map((item, itemIndex) => {
              if (item.type === 'text') {
                return (
                  <p key={itemIndex} className="paragraphLarge">
                    {renderTextContent(item)}
                  </p>
                )
              } else if (item.type === 'quote') {
                return <ArticleQuote key={itemIndex} text={item.text} />
              }
              return null
            })}
          </div>
        </div>
      )
    }

    switch (block.type) {
      case 'text':
        return (
          <div key={index} className="M_Paragraph">
            <p className="paragraphLarge">{renderTextContent(block)}</p>
          </div>
        )
      case 'image':
        return (
          <ArticleImage
            key={index}
            image={block.image}
            caption={block.caption}
          />
        )
      case 'quote':
        return <ArticleQuote key={index} text={block.text} />
      case 'divider':
        return (
          <div key={index} className="M_DividerLine">
            <div className="Q_Line"></div>
            <div className="A_Divider">
              <p className="A_Text">{block.title}</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <ArticleHero hero={hero} />

      <div className="T_ArticleBody">
        <ArticleNavigation content={contentWithIds} />

        <div className="SO_ArticleContent">
          {groupedContent.map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    </>
  )
}

export default Article
