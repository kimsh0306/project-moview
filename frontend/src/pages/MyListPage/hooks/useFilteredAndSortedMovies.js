import { useState, useEffect } from "react";
import _ from "lodash";

export const useFilteredAndSortedMovies = (data, sort, selectedGenreIds) => {
  const [appliedData, setAppliedData] = useState([]);

  const getSortedData = (sortType, movies) => {
    switch (sortType) {
      case "popularity":
        return [...movies.sort((a, b) => b.popularity - a.popularity)];
      case "vote_count":
        return [...movies.sort((a, b) => b.vote_count - a.vote_count)];
      case "vote_average":
        return [...movies.sort((a, b) => b.vote_average - a.vote_average)];
      default:
        return movies;
    }
  };

  const getSelectedGenreData = (movies) => {
    let result = [];

    selectedGenreIds.forEach((item) => {
      const filteredResults = movies.filter((obj) =>
        obj.genre_ids.includes(Number(item))
      );

      filteredResults.forEach((movie) => {
        if (!result.some((res) => res.id === movie.id)) {
          result = [...result, movie];
        }
      });
    });

    return [...result];
  };

  useEffect(() => {
    const moviesToProcess = Array.isArray(data) ? data : [];
    const cloneData = _.cloneDeep(moviesToProcess);
    const filteredData = selectedGenreIds.length > 0
      ? getSelectedGenreData(cloneData)
      : cloneData;
    const sortedData = getSortedData(sort, filteredData);
    setAppliedData(sortedData);
  }, [data, sort, selectedGenreIds]);

  return appliedData;
};
