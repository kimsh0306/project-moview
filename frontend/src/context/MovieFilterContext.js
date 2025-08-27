import React, { useReducer, createContext } from "react";

const initialState = {
  sortOption: "popularity.desc",
  genreIds: [],
  page: 1,
};

// 장르 추가/제거 로직
const toggleGenre = (genreIds, selectedGenreId) => (
  genreIds.includes(selectedGenreId)
    ? genreIds.filter((id) => id !== selectedGenreId)
    : [...genreIds, selectedGenreId]);

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_SORT":
      return { ...state, sortOption: payload.selectedSortOption };

    case "SET_GENRE":
      return { ...state, genreIds: toggleGenre(state.genreIds, payload.selectedGenreId) };

    case "SET_PAGE":
      return { ...state, page: payload.selectedPage };

    default:
      console.error(`알 수 없는 액션 타입: ${type}`);
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const MovieFilterContext = createContext();

export const MovieFilterProvider = ({ children }) => {
  const [filterState, dispatch] = useReducer(reducer, initialState);

  return (
    <MovieFilterContext.Provider value={{ filterState, dispatch }}>
      {children}
    </MovieFilterContext.Provider>
  );
};