import React from 'react'
import "./ReviewCard.style.css"

const ReviewCard = ({ reviewList}) => {
  return (
    <div className='review-container'>
      <div className='review-box'>
        <h5 className='author'>{reviewList[0].author}</h5>
        <p className='content'>{reviewList[0].content}</p>
        <h6 className='created_at'>{reviewList[0].created_at}</h6>
      </div>
    </div>
  )
}

export default ReviewCard
