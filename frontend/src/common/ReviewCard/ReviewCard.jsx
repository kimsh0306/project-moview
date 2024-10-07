import React, { useState } from "react";
import moment from "moment";
import Card from "react-bootstrap/Card";
import "./ReviewCard.style.css";

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <Card>
      <Card.Body>
        <div style={{ display: "flex" }}>
          <Card.Title className="text-nowrap">{review.author}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted w-100 pt-2 text-end">
            {moment(review.created_at).format("YYYY-MM-DD HH:mm")}
          </Card.Subtitle>
        </div>
        <Card.Text>
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
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
