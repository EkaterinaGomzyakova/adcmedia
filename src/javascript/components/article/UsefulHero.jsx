import React from 'react'

const UsefulHero = ({ hero }) => {
  const { title, author, meta, images } = hero

  return (
    <div className="SO_UsefulHero">
      {images && images.cover1 && (
        <img src={images.cover1} alt={title} className="Q_UsefulBanner" />
      )}

      <div className="O_UsefulHeadingContent">
        <div className="M_AuthorInfo">
          <img src={author.avatar} alt={author.name} className="Q_HeroImage" />
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
    </div>
  )
}

export default UsefulHero
