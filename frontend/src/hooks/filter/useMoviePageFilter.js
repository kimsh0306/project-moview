import { useContext } from "react";
import { PageContext } from "context/filter";

export const useMoviePageFilter = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('useMoviePageFilter must be used within PageProvider');
  }
  
  const { page, dispatch } = context;
  const setPage = (selectedPage) => {
    dispatch({ type: "SET_PAGE", payload: { selectedPage } });
  };
  
  return [page, setPage];
};
