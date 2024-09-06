import React, { useState } from "react";
import "./ReviewCard.style.css";
import moment from "moment";

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="review-container">
      <div className="review-box">
        <div className="header-box">
          <h5 className="author">{review.author}</h5>
          <div className="align">
            <h6 className="created_at">
              {moment(review.created_at).format("YYYY-MM-DD HH:mm")}
            </h6>
          </div>
        </div>
        <p className="content">
          {isExpanded ? review.content : truncateText(review.content, 200)}
          {!isExpanded && review.content.length > 200 && (
            <span className="more-button" onClick={() => setIsExpanded(true)}>
              {" "}
              more
            </span>
          )}
          {isExpanded && (
            <span className="close-button" onClick={() => setIsExpanded(false)}>
              {" "}
              close
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
