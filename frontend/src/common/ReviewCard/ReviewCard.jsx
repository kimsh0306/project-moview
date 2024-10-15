import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import Card from "react-bootstrap/Card";
import "./ReviewCard.style.css";

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 번역 api 한도 초과
  const fetchTranslation = async (text) => {
    const apiKey = process.env.REACT_APP_DEEPL_API_KEY;
    const url = "https://api-free.deepl.com/v2/translate";

    try {
      const res = await axios.post(url, null, {
        params: {
          auth_key: apiKey,
          text: text,
          target_lang: "KO",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      // console.log(res.data.translations[0].text)
      return res.data.translations[0].text;
    } catch (error) {
      console.error("번역 오류:", error);
    }
  };

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <Card className="review-card">
      <Card.Body>
        <div className="d-flex">
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
