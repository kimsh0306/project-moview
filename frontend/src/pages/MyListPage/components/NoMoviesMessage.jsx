import React from "react";
import { Alert, Col } from "react-bootstrap";

const NoMoviesMessage = ({ appliedDataLength, selectedGenreIdsLength }) => {
  if (appliedDataLength > 0) {
    return null; // 데이터가 있으면 아무것도 렌더링하지 않음
  }

  if (selectedGenreIdsLength > 0) {
    return (
      <Col>
        <Alert show={true} variant="primary">
          <p className="m-0">
            선택하신 장르의 영화를 찾지 못했습니다. 다른 장르를 선택해주세요.
          </p>
        </Alert>
      </Col>
    );
  }

  return (
    <Col>
      <Alert show={true} variant="primary">
        <p className="m-0">내가 찜한 영화가 없습니다.</p>
      </Alert>
    </Col>
  );
};

export default NoMoviesMessage;
