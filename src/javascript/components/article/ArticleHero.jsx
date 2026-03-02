import React from 'react'

const ArticleHero = ({ hero }) => {
  const { title, readTime, tags, author, description, images } = hero

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('Ссылка скопирована:', url)
      })
      .catch((err) => {
        console.error('Ошибка копирования:', err)
      })
  }

  return (
    <div className="SO_HeadingArticleWrapper">
      <div className="SO_HeadingArticle">
        <div className="A_Time">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
          <span>{readTime}</span>
        </div>

        <div className="O_HeadingTextArticle">
          <div className="W_ContentHeaderArticle">
            <div className="M_TagsGroup">
              {tags.map((tag, index) => (
                <p key={index} className="A_Tag A_TagMini">
                  {tag}
                </p>
              ))}
            </div>

            <h1>{title}</h1>
          </div>

          <div className="M_HeroContainer">
            <img
              src={author.avatar}
              alt={author.name}
              className="Q_HeroImage"
            />
            <p>с {author.name}</p>
          </div>

          <p className="A_TextArticle">{description}</p>

          <button className="A_ButtonCircle" onClick={handleCopyLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="Q_IconDark"
            >
              <g clipPath="url(#clip0_2001_2312)">
                <path
                  d="M8 9H7C6.46957 9 5.96086 9.21071 5.58579 9.58579C5.21071 9.96086 5 10.4696 5 11V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V11C19 10.4696 18.7893 9.96086 18.4142 9.58579C18.0391 9.21071 17.5304 9 17 9H16"
                  stroke="#FDFDFD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14V3"
                  stroke="#FDFDFD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 6L12 3L15 6"
                  stroke="#FDFDFD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2001_2312">
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
              <g clipPath="url(#clip0_2001_2313)">
                <path
                  d="M8 9H7C6.46957 9 5.96086 9.21071 5.58579 9.58579C5.21071 9.96086 5 10.4696 5 11V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V11C19 10.4696 18.7893 9.96086 18.4142 9.58579C18.0391 9.21071 17.5304 9 17 9H16"
                  stroke="#191919"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14V3"
                  stroke="#191919"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 6L12 3L15 6"
                  stroke="#191919"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2001_2313">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {images && (
        <>
          <img src={images.cover1} alt={title} className="Q_ImageCover" />
          <img src={images.cover2} alt={title} className="Q_ImageCover" />
        </>
      )}

      <div className="Q_Line Q_LineArticelHero"></div>
      <div className="Q_Line Q_LineArticelHero"></div>
      <div className="Q_Line Q_LineArticelHero"></div>
    </div>
  )
}

export default ArticleHero
