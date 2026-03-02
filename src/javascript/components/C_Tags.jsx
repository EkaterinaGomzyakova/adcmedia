import React from 'react'
import A_Tag from './A_Tag.jsx'
import tagsData from '../../data/tags.json'

const C_Tags = ({
  selectedTags = [],
  setSelectedTags,
  tagsArray = tagsData.tags
}) => {
  const handleTagClick = (tagName) => {
    if (selectedTags.includes(tagName)) {
      // Remove tag if already selected
      setSelectedTags(selectedTags.filter((t) => t !== tagName))
    } else {
      // Add tag to selection
      setSelectedTags([...selectedTags, tagName])
    }
  }

  const handleResetAll = () => {
    setSelectedTags([])
  }

  return (
    <div className="C_Tags">
      {tagsArray.map((tag) => {
        const tagName = tag.name || tag
        const isActive = selectedTags.includes(tagName)

        return (
          <A_Tag
            key={tag.id || tag}
            tagName={tagName}
            isActive={isActive}
            handleClick={() => handleTagClick(tagName)}
          />
        )
      })}
      {selectedTags.length > 0 && (
        <button className="A_ResetButton" onClick={handleResetAll}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_2001_11944)">
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2001_11944">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Сбросить всё
        </button>
      )}
    </div>
  )
}

export default C_Tags
