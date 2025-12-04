import React, { useState } from 'react'
import cn from 'classnames'

const M_userCard = ({ srcImg, descCard, isFillDote }) => {
  const [isHover, setIsHover] = useState(false)

  const dotFilled = Boolean(isFillDote) || isHover

  return (
    <div
      className="M_userCard"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={srcImg}
        alt="Картинка пользователя"
        className="Q_pictureUserCard"
      />
      <div className="W_descriptionInfo">
        <div className={cn('A_descriptionDote', { 'A_descriptionDote--filled': dotFilled })} />
        <p className="A_descriptonText">{descCard}</p>
      </div>
    </div>
  )
}

export default M_userCard