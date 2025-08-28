import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import AlertModal from "common/AlertModal/AlertModal";
import ConfirmModal from "common/ConfirmModal/ConfirmModal";
import { useFavoriteMark } from "./useFavoriteMark";
import "./FavoriteMark.style.css";

const FavoriteMark = ({ movie, fontSize = "1.7rem" }) => {
  const {
    isFavorite,
    isLoading,
    favoriteMarkProps,
    confirmModalProps,
    alertModalProps,
  } = useFavoriteMark(movie);

  return (
    <>
      {isFavorite ? (
        <OverlayTrigger
          overlay={<Tooltip className="favorite-mark">찜 제거</Tooltip>}
        >
          <div>
            <BsBookmarkDashFill
              className={`favorite-selected ${isLoading ? 'loading' : ''}`}
              style={{ fontSize: fontSize }}
              {...favoriteMarkProps}
            />
          </div>
        </OverlayTrigger>
      ) : (
        <OverlayTrigger
          overlay={<Tooltip className="favorite-mark">찜 추가</Tooltip>}
        >
          <div>
            <BsBookmarkPlus
              className={`favorite-unselected ${isLoading ? 'loading' : ''}`}
              style={{ fontSize: fontSize }}
              {...favoriteMarkProps}
            />
          </div>
        </OverlayTrigger>
      )}
      <ConfirmModal {...confirmModalProps} />
      <AlertModal {...alertModalProps} />
    </>
  );
};

export default FavoriteMark;
