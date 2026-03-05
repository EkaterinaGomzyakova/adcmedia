import React from 'react'

const O_ArticlePreview = ({ interview, isReversed }) => {
  const { tags, title, description, readTime, imageDark, imageLight, articleSlug } = interview

  const content = (
    <>
      <div className="M_ArticleTextPreview">
        <div className="M_TagsGroup">
          {tags.map((tag, index) => (
            <p key={index} className="A_Tag A_TagMini">
              {tag}
            </p>
          ))}
        </div>

        <h3 className="A_ArticleTitle">{title}</h3>
        <p className="A_TagText">{description}</p>

        <div className="A_Time">
          <svg
            className="Q_ReadTimeIcon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 4V8L11 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {readTime} чтения
        </div>
      </div>

      <img
        src={imageDark}
        alt={'Картинка статьи ' + title}
        className="M_ArticleImage M_ArticleImageDark"
      />
      <img
        src={imageLight}
        alt={'Картинка статьи ' + title}
        className="M_ArticleImage M_ArticleImageLight"
      />
    </>
  )

  if (articleSlug) {
    return (
      <a
        href={`/adcmedia/interviews/${articleSlug}.html`}
        className={`O_ArticlePreview ${isReversed ? 'O_ArticlePreview--reverse' : ''}`}
      >
        {content}
      </a>
    )
  }

  return (
    <div
      className={`O_ArticlePreview O_ArticlePreview--no-link ${isReversed ? 'O_ArticlePreview--reverse' : ''}`}
    >
      {content}
    </div>
  )
}

export default O_ArticlePreview
