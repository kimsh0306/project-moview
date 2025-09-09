import React, { useReducer, createContext, useMemo } from "react";

// 초기값
const initialSortState = "popularity.desc";

// 리듀서
const sortReducer = (state, action) => {
  switch (action.type) {
    case "SET_SORT":
      return action.payload.selectedSortOption;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Context 생성
export const SortContext = createContext();

// Provider 컴포넌트
export const SortProvider = ({ children }) => {
  const [sortOption, sortDispatch] = useReducer(sortReducer, initialSortState);

  const value = useMemo(() => ({ 
    sortOption, 
    dispatch: sortDispatch 
  }), [sortOption]);

  return (
    <SortContext.Provider value={value}>
      {children}
    </SortContext.Provider>
  );
};
