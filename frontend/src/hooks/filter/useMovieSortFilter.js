import { SortContext } from "contexts/filter";
import { useContext } from "react";

export const useMovieSortFilter = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useMovieSortFilter must be used within SortProvider');
  }
  
  const { sortOption, dispatch } = context;
  const setSortOption = (selectedSortOption) => {
    dispatch({ type: "SET_SORT", payload: { selectedSortOption } });
  };
  
  return [sortOption, setSortOption];
};
