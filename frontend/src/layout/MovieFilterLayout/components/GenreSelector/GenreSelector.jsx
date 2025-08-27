import React, { memo, useContext } from "react";
import { MovieFilterContext } from "context/MovieFilterContext";
import { useMovieGenreQuery } from "hooks/useMovieGenre";
import { Button } from "react-bootstrap";
import SectionWrapper from "../SectionWrapper";
import "./GenreSelector.css";

const GenreSelector = () => {
  const { filterState, dispatch } = useContext(MovieFilterContext);
  const { genreIds } = filterState;

  // 전체 장르 데이터
  const { data: genreDataArray } = useMovieGenreQuery();

  const handleGenreClick = (event) => {
    const selectedGenreId = event.target.value;
    dispatch({
      type: "SET_GENRE",
      payload: { selectedGenreId: selectedGenreId },
    });
  };

  return (
    <SectionWrapper
      sectionProps={{ className: "genre-selector" }}
      rowProps={{ className: "mb-5" }}
      colProps={{ xs: "12" }}
    >
      <div className="genre-btns-box">
        {genreDataArray?.map((genreData) => (
          <div className="btn-wrapper" key={genreData.id}>
            <Button
              variant={
                genreIds.includes(genreData.id.toString())
                  ? "primary"
                  : "outline-secondary"
              }
              onClick={handleGenreClick}
              value={genreData.id}
              name={genreData.name}
            >
              {genreData.name}
            </Button>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default memo(GenreSelector);
