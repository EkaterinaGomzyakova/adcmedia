import React from 'react'

const UsefulHero = ({ hero }) => {
  const { title, author, meta, images } = hero

  return (
    <div className="SO_UsefulHero">
      {images && images.cover1 && (
        <img src={images.cover1} alt={title} className={`Q_UsefulBanner${images.cover1Light ? ' Q_UsefulBannerDark' : ''}`} />
      )}
      {images && images.cover1Light && (
        <img src={images.cover1Light} alt={title} className="Q_UsefulBanner Q_UsefulBannerLight" />
      )}
    </div>
  )
}

export default UsefulHero
