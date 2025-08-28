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
    modalState,
    handlers,
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
              onClick={isLoading ? undefined : handlers.handleFavoriteMark}
              style={{ fontSize: fontSize, opacity: isLoading ? 0.5 : 1 }}
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
              onClick={isLoading ? undefined : handlers.handleFavoriteMark}
              style={{ fontSize: fontSize, opacity: isLoading ? 0.5 : 1 }}
            />
          </div>
        </OverlayTrigger>
      )}
      <ConfirmModal
        show={modalState.showConfirmModal}
        handleClose={handlers.handleConfirmClose}
        handleConfirm={handlers.handleConfirm}
      />
      <AlertModal
        show={modalState.showAlertModal}
        handleClose={handlers.handleAlertClose}
      />
    </>
  );
};

export default FavoriteMark;
