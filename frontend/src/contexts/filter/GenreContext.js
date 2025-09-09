import React, { useReducer, createContext, useMemo } from "react";

// 초기값
const initialGenreState = [];

// 장르 추가/제거 로직
const toggleGenre = (genreIds, selectedGenreId) => (
  genreIds.includes(selectedGenreId)
    ? genreIds.filter((id) => id !== selectedGenreId)
    : [...genreIds, selectedGenreId]
);

// 리듀서
const genreReducer = (state, action) => {
  switch (action.type) {
    case "SET_GENRE":
      return toggleGenre(state, action.payload.selectedGenreId);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Context 생성
export const GenreContext = createContext();

// Provider 컴포넌트
export const GenreProvider = ({ children }) => {
  const [genreIds, genreDispatch] = useReducer(genreReducer, initialGenreState);

  const value = useMemo(() => ({ 
    genreIds, 
    dispatch: genreDispatch 
  }), [genreIds]);

  return (
    <GenreContext.Provider value={value}>
      {children}
    </GenreContext.Provider>
  );
};
