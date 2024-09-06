import React, { useState } from 'react';
import "./ReviewCard.style.css";

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className='review-container'>
      <div className='review-box'>
        <h5 className='author'>{review.author}</h5>
        <p className='content'>
          {isExpanded ? review.content : truncateText(review.content, 100)} 
          {!isExpanded && review.content.length > 100 && (
            <span className="more-button" onClick={() => setIsExpanded(true)}> more</span>
          )}
          {isExpanded && (
            <span className="close-button" onClick={() => setIsExpanded(false)}> close</span>
          )}
        </p>
        <h6 className='created_at'>{review.created_at}</h6>
      </div>
    </div>
  );
}

export default ReviewCard;