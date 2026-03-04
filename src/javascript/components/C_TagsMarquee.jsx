import React from 'react'
import tagsData from '../../data/tags.json'

const C_TagsMarquee = () => {
  const tags = tagsData.tags

  return (
    <div className="C_TagsMarqueeWrapper">
      <div className="C_TagsMarqueeTrack">
        {/* First set of tags */}
        {tags.map((tag, index) => (
          <div key={`tag-1-${index}`} className="M_TagBig">
            {tag.name || tag}
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {tags.map((tag, index) => (
          <div key={`tag-2-${index}`} className="M_TagBig">
            {tag.name || tag}
          </div>
        ))}
      </div>
    </div>
  )
}

export default C_TagsMarquee
