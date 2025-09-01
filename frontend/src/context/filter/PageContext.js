import React, { useReducer, createContext, useMemo } from "react";

// 초기값
const initialPageState = 1;

// 리듀서
const pageReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return action.payload.selectedPage;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Context 생성
export const PageContext = createContext();

// Provider 컴포넌트
export const PageProvider = ({ children }) => {
  const [page, pageDispatch] = useReducer(pageReducer, initialPageState);

  const value = useMemo(() => ({ 
    page, 
    dispatch: pageDispatch 
  }), [page]);

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
};
