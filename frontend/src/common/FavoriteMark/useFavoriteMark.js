import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMyMoviesQuery } from 'hooks/useMyMoviesQuery';
import { useAddMyMovieMutation, useRemoveMyMovieMutation } from 'hooks/useMyMoviesMutation';

export const useFavoriteMark = (movie) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const userState = useSelector((state) => state.auth.user);
  const { data: myMovies } = useMyMoviesQuery();
  const addMovieMutation = useAddMyMovieMutation();
  const removeMovieMutation = useRemoveMyMovieMutation();
  const isLoading = addMovieMutation.isPending || removeMovieMutation.isPending;

  const navigate = useNavigate();

  useEffect(() => {
    if (!movie || !myMovies) return;
    setIsFavorite(myMovies.some((myMovie) => myMovie.id === movie.id));
  }, [movie, myMovies]);

  const handleFavoriteMark = (e) => {
    e.stopPropagation();

    if (!userState) {
      setShowConfirmModal("로그인이 필요한 서비스입니다. 로그인하시겠습니까?");
      return;
    }

    const moviePayload = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      adult: movie.adult,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      genre_ids: movie.genre_ids,
    };

    if (isFavorite) {
      removeMovieMutation.mutate(movie.id, {
        onError: (error) => {
          setShowAlertModal(error.message);
          console.error("Error removing movie:", error);
        },
      });
    } else {
      addMovieMutation.mutate(moviePayload, {
        onError: (error) => {
          setShowAlertModal(error.message);
          console.error("Error adding movie:", error);
        },
      });
    }
  };

  const handleConfirm = () => navigate("/login");
  const handleConfirmClose = () => setShowConfirmModal(false);
  const handleAlertClose = () => setShowAlertModal(false);

  return {
    isFavorite,
    isLoading,
    favoriteMarkProps: {
      onClick: isLoading ? undefined : handleFavoriteMark,
    },
    confirmModalProps: {
      show: showConfirmModal,
      handleClose: handleConfirmClose,
      handleConfirm: handleConfirm,
    },
    alertModalProps: {
      show: showAlertModal,
      handleClose: handleAlertClose,
    },
  };
};
