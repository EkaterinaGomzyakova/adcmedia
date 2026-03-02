import React from 'react'

const ArticleQuote = ({ text }) => {
  return (
    <div className="M_Quote">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="49"
        height="46"
        viewBox="0 0 49 46"
        fill="none"
      >
        <path
          d="M18.72 8.28C14.76 9 11.88 11.88 10.26 17.1C9.36 19.62 9 21.96 9 24.48V25.2C9 25.38 9 25.92 9.18 26.64H18.72V45.72H0V28.08C0 19.44 1.8 12.78 5.22 8.1C8.64 3.42 13.14 0.720001 18.72 0V8.28ZM48.42 8.28C45.18 8.82 42.66 10.62 41.04 13.68C39.42 16.74 38.52 20.34 38.52 24.48V25.38C38.52 25.74 38.7 26.1 38.7 26.64H48.42V45.72H29.52V28.08C29.52 21.24 30.96 14.94 34.02 9.36C36.9 3.96 41.76 0.720001 48.42 0V8.28Z"
          fill="#3CC68B"
        />
      </svg>
      <h3>{text}</h3>
    </div>
  )
}

export default ArticleQuote
