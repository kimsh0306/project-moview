import { useContext } from "react";
import { GenreContext } from "contexts/filter";

export const useMovieGenreFilter = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error('useMovieGenreFilter must be used within GenreProvider');
  }
  
  const { genreIds, dispatch } = context;
  const setGenreIds = (selectedGenreId) => {
    dispatch({ type: "SET_GENRE", payload: { selectedGenreId } });
  };
  
  return [genreIds, setGenreIds];
};
