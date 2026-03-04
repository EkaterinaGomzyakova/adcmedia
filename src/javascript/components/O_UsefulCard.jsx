import React from 'react'

const O_UsefulCard = ({ article }) => {
  const { title, meta, preview, slug } = article

  return (
    <a href={`/adcmedia/useful/article.html?slug=${slug}`} className="O_UsefulCard">
      <div className="M_UsefulImage">
        <img
          src={preview?.image}
          alt={title}
          className="M_UsefulImageDark"
        />
        <img
          src={preview?.imageLight}
          alt={title}
          className="M_UsefulImageLight"
        />
      </div>

      <div className="M_UsefulTextCaption">
        <h3>{title}</h3>

        <div className="C_Tags">
          {meta?.tags?.map((tag, index) => (
            <div key={index} className="A_Tag">
              <div className="Q_Dot"></div>
              <div className="A_Text">
                <p>{tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </a>
  )
}

export default O_UsefulCard
