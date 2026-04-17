import React, { useEffect } from 'react'
import UsefulHero from './UsefulHero.jsx'
import ArticleNavigation from './ArticleNavigation.jsx'
import ArticleImage from './ArticleImage.jsx'
import ArticleQuote from './ArticleQuote.jsx'
import ArticleSection from './ArticleSection.jsx'
import ArticleButton from './ArticleButton.jsx'

const UsefulArticle = ({ data }) => {
  const { hero, content } = data

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
            contentWithIds[i].type === 'quote' ||
            contentWithIds[i].type === 'list')
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
            contentWithIds[i].type === 'quote' ||
            contentWithIds[i].type === 'list')
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
          contentWithIds[i].type === 'quote' ||
          contentWithIds[i].type === 'list')
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
                <div
                  key={innerIndex}
                  className="W_TextBlockArticle"
                  id={`heading-${innerBlock.number}`}
                >
                  <div
                    className="M_NumberQuestion"
                    onClick={() => handleCopyHeadingLink(innerBlock.number)}
                  >
                    <p>{String(innerBlock.number).padStart(2, '0')}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="Q_IconDark"
                    >
                      <g clipPath="url(#clip0_2009_7549)">
                        <path
                          d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                          stroke="#191919"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.5608 6.96685 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.6661 2.05659 16.9771C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
                          stroke="#191919"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2009_7549">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="Q_IconLight"
                    >
                      <g clipPath="url(#clip0_2009_7550)">
                        <path
                          d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                          stroke="#FDFDFD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.5608 6.96685 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.6661 2.05659 16.9771C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
                          stroke="#FDFDFD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2009_7550">
                          <rect width="24" height="24" fill="white" />
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
                            {item.content}
                          </p>
                        )
                      } else if (item.type === 'quote') {
                        return <ArticleQuote key={itemIndex} text={item.text} />
                      } else if (item.type === 'list') {
                        return (
                          <ul key={itemIndex} className="M_ArticleList">
                            {item.items.map((li, liIndex) => (
                              <li key={liIndex}>{li}</li>
                            ))}
                          </ul>
                        )
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
              case 'button':
                return (
                  <ArticleButton
                    key={innerIndex}
                    text={innerBlock.text}
                    url={innerBlock.url}
                  />
                )
              case 'list':
                return (
                  <ul key={innerIndex} className="M_ArticleList">
                    {innerBlock.items.map((li, liIndex) => (
                      <li key={liIndex}>{li}</li>
                    ))}
                  </ul>
                )
              case 'image-pair':
                return (
                  <div key={innerIndex} className="M_ImagePair">
                    <div className="M_ImagePair__images">
                      {innerBlock.images.map((img, imgIndex) => (
                        <img key={imgIndex} src={img} alt="" />
                      ))}
                    </div>
                    {innerBlock.caption && <p className="A_Text">{innerBlock.caption}</p>}
                  </div>
                )
              case 'image-grid':
                return (
                  <div key={innerIndex} className="M_ImageGrid">
                    <div className="M_ImageGrid__images">
                      {innerBlock.images.map((img, imgIndex) => (
                        <img key={imgIndex} src={img} alt="" />
                      ))}
                    </div>
                    {innerBlock.caption && <p className="A_Text">{innerBlock.caption}</p>}
                  </div>
                )
              default:
                return null
            }
          })}
        </div>
      )
    }

    if (block.type === 'headingGroup') {
      return (
        <div
          key={index}
          className="W_TextBlockArticle"
          id={`heading-${block.number}`}
        >
          <div
            className="M_NumberQuestion"
            onClick={() => handleCopyHeadingLink(block.number)}
          >
            <p>{String(block.number).padStart(2, '0')}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="Q_IconDark"
            >
              <g clipPath="url(#clip0_2009_7549)">
                <path
                  d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                  stroke="#191919"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.5608 6.96685 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.6661 2.05659 16.9771C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
                  stroke="#191919"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2009_7549">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="Q_IconLight"
            >
              <g clipPath="url(#clip0_2009_7550)">
                <path
                  d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                  stroke="#FDFDFD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00768C9.63819 8.95646 8.92037 9.05967 8.24861 9.31023C7.57685 9.5608 6.96685 9.95303 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.6661 2.05659 16.9771C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3962 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
                  stroke="#FDFDFD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2009_7550">
                  <rect width="24" height="24" fill="white" />
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
                    {item.content}
                  </p>
                )
              } else if (item.type === 'quote') {
                return <ArticleQuote key={itemIndex} text={item.text} />
              } else if (item.type === 'list') {
                return (
                  <ul key={itemIndex} className="M_ArticleList">
                    {item.items.map((li, liIndex) => (
                      <li key={liIndex}>{li}</li>
                    ))}
                  </ul>
                )
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
            <p className="paragraphLarge">{block.content}</p>
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
      case 'button':
        return <ArticleButton key={index} text={block.text} url={block.url} />
      case 'list':
        return (
          <ul key={index} className="M_ArticleList">
            {block.items.map((li, liIndex) => (
              <li key={liIndex}>{li}</li>
            ))}
          </ul>
        )
      case 'image-pair':
        return (
          <div key={index} className="M_ImagePair">
            <div className="M_ImagePair__images">
              {block.images.map((img, imgIndex) => (
                <img key={imgIndex} src={img} alt="" />
              ))}
            </div>
            {block.caption && <p className="A_Text">{block.caption}</p>}
          </div>
        )
      case 'image-grid':
        return (
          <div key={index} className="M_ImageGrid">
            <div className="M_ImageGrid__images">
              {block.images.map((img, imgIndex) => (
                <img key={imgIndex} src={img} alt="" />
              ))}
            </div>
            {block.caption && <p className="A_Text">{block.caption}</p>}
          </div>
        )
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

  const { title, author, meta } = hero

  return (
    <>
      <UsefulHero hero={hero} />

      <div className="T_ArticleBody T_UsefulArticleBody">
        <div className="SO_ArticleContent">
          <div className="O_UsefulHeadingContent">
            <div className="M_AuthorInfo">
              <img
                src={author.avatar}
                alt={author.name}
                className="Q_HeroImage"
              />
              <p>{author.name}</p>
            </div>

            <h1>{title}</h1>

            <div className="M_UsefulMeta">
              {meta.date && (
                <div className="A_MetaItem">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_2027_490)">
                      <path
                        d="M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z"
                        stroke="#8E8E8E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 3V7"
                        stroke="#8E8E8E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 3V7"
                        stroke="#8E8E8E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4 11H20"
                        stroke="#8E8E8E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11 15H12"
                        stroke="#8E8E8E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 15V18"
                        stroke="#8E8E8E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2027_490">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>{meta.date}</span>
                </div>
              )}
              {meta.channel && (
                <div className="A_MetaItem">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M16.1164 9.29518C16.6684 8.74318 17.2164 7.45518 14.9164 9.01918C12.7678 10.4979 10.6047 11.9553 8.42736 13.3912C8.0958 13.5411 7.73735 13.6225 7.37356 13.6304C7.00976 13.6383 6.64812 13.5726 6.31036 13.4372C4.93036 13.0232 3.31936 12.4712 3.31936 12.4712C3.31936 12.4712 2.21936 11.7802 4.10236 11.0442C4.10236 11.0442 12.0634 7.77718 14.8244 6.62618C15.8824 6.16618 19.4714 4.69418 19.4714 4.69418C19.4714 4.69418 21.1284 4.04918 20.9904 5.61418C20.9444 6.25818 20.5764 8.51418 20.2084 10.9522C19.6554 14.4032 19.0574 18.1772 19.0574 18.1772C19.0574 18.1772 18.9654 19.2352 18.1834 19.4192C17.3462 19.405 16.5374 19.1138 15.8834 18.5912C15.6994 18.4532 12.4324 16.3822 11.2354 15.3702C11.1136 15.2877 11.0147 15.1758 10.9478 15.0448C10.8809 14.9138 10.8483 14.768 10.8528 14.621C10.8574 14.474 10.8991 14.3306 10.9741 14.204C11.049 14.0775 11.1547 13.9719 11.2814 13.8972C12.9231 12.3951 14.5351 10.8608 16.1164 9.29518Z"
                      stroke="#8E8E8E"
                      stroke-width="1.5"
                    />
                  </svg>
                  <span>{meta.channel}</span>
                </div>
              )}
            </div>
          </div>
          {groupedContent.map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    </>
  )
}

export default UsefulArticle
