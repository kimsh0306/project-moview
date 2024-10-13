import React from "react";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const FavoriteMark = ({ isFavorite, setIsFavorite, fontSize = "1.7rem" }) => {
  
  const handleFavoriteItem = (e) => {
    e.stopPropagation(); // 이벤트 버블링을 막음
    setIsFavorite((prev) => !prev);
  };

  return isFavorite ? (
    <OverlayTrigger overlay={<Tooltip>찜목록에서 제거</Tooltip>}>
      <div>
        <BsBookmarkDashFill
          className="favorite-selected"
          onClick={handleFavoriteItem}
          style={{ fontSize: fontSize }}
        />
      </div>
    </OverlayTrigger>
  ) : (
    <OverlayTrigger overlay={<Tooltip>찜목록에 추가</Tooltip>}>
      <div>
        <BsBookmarkPlus
          className="favorite-unselected"
          onClick={handleFavoriteItem}
          style={{ fontSize: fontSize }}
        />
      </div>
    </OverlayTrigger>
  );
};

export default FavoriteMark;
